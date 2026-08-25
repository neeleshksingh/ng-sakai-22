import { LayoutService } from '@/app/layout/service/layout.service';
import { SharedModule } from '@/shared.module';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { BatchFacultyFeedbackService } from 'src/app/executive-edge/services/batch-faculty-feedback.service';
import { FeedbackAnnouncementService } from 'src/app/executive-edge/services/feedback-announcement/feedback-announcement.service';
import { OrganisationFeedbackInternalService } from 'src/app/executive-edge/services/organisation-feedback-internal.service';
import { ExcelFileProcessService } from 'src/app/global/services/file-process/excel-file-process.service';
import { FeedbackAnnouncement } from 'src/app/shared/models/executiveedge/feedback-announcement';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-feed-back-chart',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './feed-back-chart.component.html',
  styleUrl: './feed-back-chart.component.scss'
})
export class FeedBackChartComponent implements OnInit {
  activeFeedbackAnnouncementList: FeedbackAnnouncement[] = [];
  facultyFeedbackPivotList: any[] = [];
  feedbackAnnouncementId: any;
  isLoading: boolean = true;
  totalResponses: number = 0;

  trendChartOptions: EChartsOption = {};
  strengthWeaknessChartOptions: EChartsOption = {};
  overallRatingChartOptions: EChartsOption = {};
  sentimentChartOptions: EChartsOption = {};
  departmentWiseRatingChartOptions: EChartsOption = {};

  hasOverallRatingData: boolean = false;
  hasSentimentData: boolean = false;
  hasTrendData: boolean = false;

  departmentChartHeight: number = 300;

  facultyWiseRatingList: any[] = [];
  originalDataArray: any[] = [];
  chartHeight: number = 300;

  feedbackByClassChartData: any;
  feedbackByClassChartOptions: any;
  feedbackByClassData: {
    label: string;
    rating: number;
    count: number;
    percentage: number;
    color: string;
    stars: number[];
  }[] = [];
  feedbackByClassAvg: number = 0;
  feedbackByClassTotal: number = 0;
  feedbackByClassAvgStars: number[] = [];

  constructor(
    private batchFacultyFeedbackService: BatchFacultyFeedbackService,
    private excelFileProcessService: ExcelFileProcessService,
    private feedbackAnnouncementService: FeedbackAnnouncementService,
    private messageService: MessageService,
    private fb: FormBuilder,
    private OrganisationFeedbackInternalService: OrganisationFeedbackInternalService,
    public layoutService: LayoutService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.getActiveFeedbackAnnouncement();
  }

  get colorScheme(): string {
    return this.layoutService.isDarkTheme() ? 'dark' : 'light';
  }

  getActiveFeedbackAnnouncement() {
    this.feedbackAnnouncementService.getActiveFeedbackAnnouncement().subscribe({
      next: (response) => {
        const published = response.filter((x: any) => x.status.toUpperCase() === 'PUBLISHED');
        if (published.length === 0) {
          this.isLoading = false;
          this.cdr.detectChanges();
          this.messageService.add({
            severity: 'info', summary: 'No Data',
            detail: 'No published feedback announcements found.'
          });
          return;
        }
        const now = new Date();
        published.sort((a: any, b: any) =>
          Math.abs(new Date(a.endDateTime).getTime() - now.getTime()) -
          Math.abs(new Date(b.endDateTime).getTime() - now.getTime())
        );
        this.feedbackAnnouncementId = published[0].id;
        this.getBatchFeedbackAnalyticsByFeedbackAnnouncement();
      },
      error: () => {
        this.isLoading = false;
        this.cdr.detectChanges();
        this.messageService.add({
          severity: 'error', summary: 'Error',
          detail: 'Failed to fetch active feedback announcements.'
        });
      }
    });
  }

  getBatchFeedbackAnalyticsByFeedbackAnnouncement() {
    if (!this.feedbackAnnouncementId) {
      this.messageService.add({
        severity: 'warn', summary: 'Warning',
        detail: 'Please select a feedback announcement.'
      });
      return;
    }
    this.isLoading = true;
    this.OrganisationFeedbackInternalService
      .getBatchFacultyFeedbackAnalyticsByFeedbackAnnouncement(this.feedbackAnnouncementId)
      .subscribe({
        next: (response: any) => {
          try {
            this.facultyFeedbackPivotList = response.batchFacultyFeedbackList;
            this.facultyWiseRatingList = response.facultyWiseRating || [];

            const strengthWeaknessData =
              response.strengthWeakness ||
              response.strengthsWeakness ||
              response.strengthAndWeakness ||
              response.criteriaFeedback;
            if (strengthWeaknessData) {
              this.bindStrengthWeaknessChart(strengthWeaknessData);
            } else {
              console.warn('StrengthWeakness data not found.');
            }

            if (response.summary && response.questions) {
              this.bindOverallRatingChart(response.summary, response.questions);
              this.bindFeedbackByClassChart(response.summary, response.questions);
            } else {
              console.warn('Summary or questions data not found.');
            }

            if (response.sentimentAnalysis && response.sentimentAnalysis.length > 0) {
              this.bindSentimentChart(response.sentimentAnalysis[0]);
            } else {
              console.warn('Sentiment analysis data not found.');
            }

            if (response.trendAnalysis && response.trendAnalysis.length > 0) {
              this.bindTrendAnalysisChart(response.trendAnalysis);
            } else {
              console.warn('Trend analysis data not found.');
            }

            if (response.departmentWiseRating && response.departmentWiseRating.length > 0) {
              this.bindDepartmentWiseRatingChart(response.departmentWiseRating);
            } else {
              console.warn('Department wise rating data not found.');
            }
          } catch (e) {
            console.error('Error processing feedback analytics data:', e);
          } finally {
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        },
        error: () => {
          this.isLoading = false;
          this.cdr.detectChanges();
          this.messageService.add({
            severity: 'error', summary: 'Error', detail: 'Failed to fetch data.'
          });
        }
      });
  }

  bindOverallRatingChart(summary: any[], questions: any[]): void {
    if (!summary || summary.length === 0) return;

    const isDark = this.colorScheme === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#1f2937';

    const ratingCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRatings = 0;

    summary.forEach((response: any) => {
      questions.forEach((question: any) => {
        const questionId = question.id.toString();
        if (questionId === '42') return;
        const rating = response[questionId];
        if (rating >= 1 && rating <= 5) {
          ratingCounts[rating as keyof typeof ratingCounts]++;
          totalRatings++;
        }
      });
    });

    this.totalResponses = summary.length;

    const ratingPercentages = [1, 2, 3, 4, 5].map(rating => {
      const count = ratingCounts[rating as keyof typeof ratingCounts];
      return totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;
    });

    const ratingNames = ['Poor (1)', 'Average (2)', 'Good (3)', 'Very Good (4)', 'Excellent (5)'];
    const ratingColors = ['#EF4444', '#F97316', '#60A5FA', '#14B8A6', '#4CAF50'];

    const pieData = ratingNames.map((name, i) => ({
      value: ratingPercentages[i],
      name: `${name}    ${ratingPercentages[i]}%`,
      itemStyle: { color: ratingColors[i] }
    }));

    this.overallRatingChartOptions = {
      backgroundColor: 'transparent',
      title: {
        text: 'Overall Feedback Rating Distribution',
        left: 'center',
        top: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          color: textColor
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          const idx = [1, 2, 3, 4, 5].indexOf(params.dataIndex + 1);
          const count = ratingCounts[(params.dataIndex + 1) as keyof typeof ratingCounts];
          return `${ratingNames[params.dataIndex]}: ${params.value}% (${count} ratings)`;
        }
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: 'center',
        textStyle: { fontSize: 11, color: textColor },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 15
      },
      graphic: [
        {
          type: 'text',
          left: 'center',
          top: '42%',
          style: {
            text: this.totalResponses.toString(),
            fontSize: 28,
            fontWeight: 'bold',
            fill: textColor,
            align: 'center'
          }
        },
        {
          type: 'text',
          left: 'center',
          top: '55%',
          style: {
            text: 'Responses',
            fontSize: 14,
            fill: isDark ? '#94a3b8' : '#6b7280',
            align: 'center'
          }
        }
      ],
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['35%', '55%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'inside',
            formatter: (params: any) => params.value > 0 ? `${params.value}%` : '',
            fontSize: 12,
            fontWeight: 'bold',
            color: '#ffffff'
          },
          labelLine: { show: false },
          data: pieData
        }
      ]
    };

    this.hasOverallRatingData = true;
  }

  bindTrendAnalysisChart(data: any[]): void {
    if (!data || data.length === 0) {
      this.trendChartOptions = {};
      return;
    }

    const isDark = this.colorScheme === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#495057';
    const borderColor = isDark ? '#334155' : '#e2e8f0';

    const months = data.map(x => x.Month || x.month || '');
    const ratings = data.map(x =>
      x.AverageRating ?? x.averageRating ??
      x.Rating ?? x.rating ?? null
    );

    this.trendChartOptions = {
      backgroundColor: 'transparent',
      title: {
        text: 'Feedback Trend Over Time',
        left: 'center',
        top: 0,
        textStyle: {
          fontSize: 15,
          fontWeight: 'bold',
          color: textColor
        }
      },
      tooltip: {
        trigger: 'axis',
        formatter: (params: any) => {
          const p = Array.isArray(params) ? params[0] : params;
          return `${p.name}<br/>Average Rating: ${Number(p.value).toFixed(2)} / 5.00`;
        },
        backgroundColor: 'rgba(0,0,0,0.8)',
        textStyle: { fontSize: 12, color: '#fff' },
        borderWidth: 0,
        padding: 10
      },
      legend: {
        bottom: 0,
        textStyle: { fontSize: 11, color: textColor },
        icon: 'circle',
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12
      },
      grid: {
        left: 16,
        right: 16,
        top: 50,
        bottom: 40,
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: months,
        boundaryGap: false,
        axisLabel: {
          color: textColor,
          fontSize: months.length <= 3 ? 12 : months.length <= 6 ? 11 : 9,
          rotate: months.length <= 4 ? 0 : months.length <= 7 ? 30 : 45
        },
        axisLine: { lineStyle: { color: borderColor } },
        axisTick: { alignWithLabel: true },
        name: 'Month',
        nameLocation: 'middle',
        nameGap: 30,
        nameTextStyle: { fontSize: 13, fontWeight: 'bold', color: textColor }
      },
      yAxis: {
        type: 'value',
        min: 1,
        max: 5,
        interval: 1,
        axisLabel: {
          color: textColor,
          fontSize: 12,
          formatter: (value: number) => value.toFixed(0)
        },
        splitLine: { lineStyle: { color: borderColor, type: 'dashed' } },
        name: 'Average Rating',
        nameTextStyle: { fontSize: 13, fontWeight: 'bold', color: textColor }
      },
      series: [
        {
          name: 'Average Rating',
          type: 'line',
          data: ratings,
          smooth: true,
          symbol: 'circle',
          symbolSize: months.length <= 3 ? 16 : months.length <= 6 ? 12 : 8,
          lineStyle: { color: '#6366F1', width: 3 },
          itemStyle: {
            color: '#6366F1',
            borderColor: '#ffffff',
            borderWidth: 3
          },
          label: {
            show: true,
            position: 'top',
            formatter: (params: any) => Number(params.value).toFixed(2),
            fontSize: months.length <= 3 ? 13 : months.length <= 6 ? 11 : 9,
            fontWeight: 'bold',
            color: '#4338ca',
            backgroundColor: 'rgba(255,255,255,0.93)',
            padding: [2, 6],
            borderRadius: 3
          }
        }
      ]
    };

    this.hasTrendData = true;
  }

  bindSentimentChart(sentimentData: any): void {
    const isDark = this.colorScheme === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#1f2937';

    const positive = sentimentData.Positive || 0;
    const neutral = sentimentData.Neutral || 0;
    const negative = sentimentData.Negative || 0;
    const total = positive + neutral + negative;

    const positivePct = total > 0 ? Math.round((positive / total) * 100) : 0;
    const neutralPct = total > 0 ? Math.round((neutral / total) * 100) : 0;
    const negativePct = total > 0 ? 100 - positivePct - neutralPct : 0;

    const counts = [positive, neutral, negative];

    this.sentimentChartOptions = {
      backgroundColor: 'transparent',
      title: {
        text: 'Sentiment Analysis',
        left: 'center',
        top: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          color: textColor
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          return `${params.name}: ${params.value}% (${counts[params.dataIndex]} responses)`;
        }
      },
      legend: {
        orient: 'vertical',
        right: 0,
        top: 'center',
        textStyle: { fontSize: 11, color: textColor },
        itemWidth: 12,
        itemHeight: 12,
        itemGap: 15,
        formatter: (name: string) => {
          const idx = ['Positive', 'Neutral', 'Negative'].indexOf(name);
          const pcts = [positivePct, neutralPct, negativePct];
          return `${name}  ${pcts[idx]}%`;
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['35%', '65%'],
          center: ['35%', '55%'],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: 'inside',
            formatter: (params: any) => params.value > 0 ? `${params.value}%` : '',
            fontSize: 12,
            fontWeight: 'bold',
            color: '#ffffff'
          },
          labelLine: { show: false },
          data: [
            { value: positivePct, name: 'Positive', itemStyle: { color: '#22C55E' } },
            { value: neutralPct, name: 'Neutral', itemStyle: { color: '#60A5FA' } },
            { value: negativePct, name: 'Negative', itemStyle: { color: '#EF4444' } }
          ]
        }
      ]
    };

    this.hasSentimentData = true;
  }

  getAvatarColor(index: number): string {
    const colors = ['#6366F1', '#22C55E', '#F59E0B', '#EF4444', '#3B82F6', '#8B5CF6', '#EC4899', '#14B8A6'];
    return colors[index % colors.length];
  }

  getRatingStyle(rating: number): any {
    if (rating >= 4.5) return { background: '#dcfce7', color: '#16a34a' };
    if (rating >= 4.0) return { background: '#dbeafe', color: '#1d4ed8' };
    if (rating >= 3.0) return { background: '#fef9c3', color: '#a16207' };
    return { background: '#fee2e2', color: '#dc2626' };
  }

  getOverallAverage(): number {
    if (!this.facultyWiseRatingList || this.facultyWiseRatingList.length === 0) return 0;
    const sum = this.facultyWiseRatingList.reduce((acc, f) => acc + (f.AverageRating || 0), 0);
    return sum / this.facultyWiseRatingList.length;
  }

  bindFeedbackByClassChart(summary: any[], questions: any[]): void {
    if (!summary || summary.length === 0) return;

    const ratingCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    let totalRatings = 0;
    let ratingSum = 0;

    summary.forEach((response: any) => {
      questions.forEach((question: any) => {
        const questionId = question.id.toString();
        if (questionId === '42') return;
        const rating = response[questionId];
        if (rating >= 1 && rating <= 5) {
          ratingCounts[rating]++;
          totalRatings++;
          ratingSum += rating;
        }
      });
    });

    this.feedbackByClassTotal = totalRatings;
    this.feedbackByClassAvg = totalRatings > 0
      ? Math.round((ratingSum / totalRatings) * 100) / 100
      : 0;

    const avgRounded = Math.round(this.feedbackByClassAvg);
    this.feedbackByClassAvgStars = [1, 2, 3, 4, 5].map(s => s <= avgRounded ? 1 : 0);

    const config = [
      { rating: 5, label: 'Excellent', color: '#4CAF50' },
      { rating: 4, label: 'Very Good', color: '#378ADD' },
      { rating: 3, label: 'Good', color: '#FAC775' },
      { rating: 2, label: 'Average', color: '#F97316' },
      { rating: 1, label: 'Poor', color: '#EF4444' },
    ];

    this.feedbackByClassData = config.map(c => {
      const count = ratingCounts[c.rating];
      const pct = totalRatings > 0 ? Math.round((count / totalRatings) * 100) : 0;
      return {
        label: c.label,
        rating: c.rating,
        count,
        percentage: pct,
        color: c.color,
        stars: [1, 2, 3, 4, 5].map(s => s <= c.rating ? 1 : 0)
      };
    });
  }

  private calculateChartHeight(labels: string[]): number {
    const baseLineHeight = 20;
    const minRowHeight = 52;
    const baseHeight = 75;
    const rowGap = 8;

    const maxLines = Math.max(
      ...labels.map(label => Math.ceil(label.length / 55))
    );

    const rowHeight = Math.max(minRowHeight, maxLines * baseLineHeight + 12);
    const totalHeight = labels.length * (rowHeight + rowGap);

    // FIX: Removed Math.min(650, ...) so the chart can scale properly with many rows
    return Math.max(180, baseHeight + totalHeight);
  }

  bindStrengthWeaknessChart(strengthWeaknessData: any): void {
    let dataArray = strengthWeaknessData;

    if (!Array.isArray(strengthWeaknessData)) {
      for (const key in strengthWeaknessData) {
        if (Array.isArray(strengthWeaknessData[key])) {
          dataArray = strengthWeaknessData[key];
          break;
        }
      }
    }

    if (!dataArray || !Array.isArray(dataArray) || dataArray.length === 0) {
      console.warn('No valid strength/weakness data array found');
      return;
    }

    this.originalDataArray = dataArray;

    const isDark = this.colorScheme === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#495057';
    const borderColor = isDark ? '#334155' : 'rgba(0,0,0,0.04)';

    const rawLabels: string[] = dataArray.map((item: any, index: number) => {
      const full = item.Areas || item.criteria || item.name || `Item ${index + 1}`;
      return full.split('/')[0].trim();
    });

    const positiveData = dataArray.map((item: any) => {
      const pos = item.Positive || item.positive || 0;
      const neu = item.Neutral || item.neutral || 0;
      const neg = item.Negative || item.negative || 0;
      const total = pos + neu + neg;
      return total > 0 ? Math.round((pos / total) * 100) : 0;
    });

    const neutralData = dataArray.map((item: any) => {
      const pos = item.Positive || item.positive || 0;
      const neu = item.Neutral || item.neutral || 0;
      const neg = item.Negative || item.negative || 0;
      const total = pos + neu + neg;
      return total > 0 ? Math.round((neu / total) * 100) : 0;
    });

    const negativeData = dataArray.map((item: any) => {
      const pos = item.Positive || item.positive || 0;
      const neu = item.Neutral || item.neutral || 0;
      const neg = item.Negative || item.negative || 0;
      const total = pos + neu + neg;
      const pPct = total > 0 ? Math.round((pos / total) * 100) : 0;
      const nPct = total > 0 ? Math.round((neu / total) * 100) : 0;
      return total > 0 ? 100 - pPct - nPct : 0;
    });

    this.chartHeight = this.calculateChartHeight(rawLabels);

    this.strengthWeaknessChartOptions = {
      backgroundColor: 'transparent',
      title: {
        text: 'Strengths vs Improvement Areas',
        left: 'center',
        top: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          color: textColor
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const items = Array.isArray(params) ? params : [params];
          const idx = items[0]?.dataIndex ?? 0;
          const fullLabel =
            this.originalDataArray[idx]?.Areas ||
            this.originalDataArray[idx]?.criteria ||
            this.originalDataArray[idx]?.name ||
            rawLabels[idx] || '';
          let result = `<strong>${fullLabel}</strong><br/>`;
          items.forEach((item: any) => {
            result += `${item.marker} ${item.seriesName}: ${item.value}%<br/>`;
          });
          return result;
        },
        backgroundColor: 'rgba(17,24,39,0.95)',
        textStyle: { fontSize: 11, color: '#fff' },
        padding: 10,
        borderWidth: 0,
        borderRadius: 6
      },
      legend: {
        bottom: 0,
        textStyle: { fontSize: 11, fontWeight: 500, color: textColor },
        icon: 'roundRect',
        itemWidth: 8,
        itemHeight: 8,
        itemGap: 12
      },
      grid: {
        left: 5,
        right: 15,
        top: 40,
        bottom: 40,
        containLabel: true
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: 100,
        axisLabel: {
          fontSize: 10,
          color: textColor,
          formatter: (value: number) => `${value}%`
        },
        splitLine: { lineStyle: { color: borderColor } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'category',
        data: rawLabels,
        inverse: true,
        axisLabel: {
          fontSize: 10.5,
          fontWeight: 500,
          color: textColor,
          width: 200,
          overflow: 'truncate',
          lineHeight: 14
        },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          name: 'Positive',
          type: 'bar',
          stack: 'total',
          data: positiveData,
          itemStyle: { color: '#22C55E', borderRadius: [0, 0, 0, 0] },
          barWidth: '60%',
          label: {
            show: true,
            position: 'inside',
            formatter: (params: any) => params.value > 5 ? `${params.value}%` : '',
            fontSize: 10,
            fontWeight: 'bold',
            color: '#ffffff'
          }
        },
        {
          name: 'Neutral',
          type: 'bar',
          stack: 'total',
          data: neutralData,
          itemStyle: { color: '#60A5FA', borderRadius: [0, 0, 0, 0] },
          barWidth: '60%',
          label: {
            show: true,
            position: 'inside',
            formatter: (params: any) => params.value > 5 ? `${params.value}%` : '',
            fontSize: 10,
            fontWeight: 'bold',
            color: '#ffffff'
          }
        },
        {
          name: 'Negative',
          type: 'bar',
          stack: 'total',
          data: negativeData,
          itemStyle: { color: '#EF4444', borderRadius: [0, 0, 0, 0] },
          barWidth: '60%',
          label: {
            show: true,
            position: 'inside',
            formatter: (params: any) => params.value > 5 ? `${params.value}%` : '',
            fontSize: 10,
            fontWeight: 'bold',
            color: '#ffffff'
          }
        }
      ]
    };
  }

  bindDepartmentWiseRatingChart(departmentWiseRating: any[]): void {
    if (!departmentWiseRating || departmentWiseRating.length === 0) return;

    const isDark = this.colorScheme === 'dark';
    const textColor = isDark ? '#cbd5e1' : '#495057';
    const borderColor = isDark ? '#334155' : '#e2e8f0';

    const sorted = [...departmentWiseRating].sort(
      (a, b) => (b.AverageRating ?? b.averageRating ?? 0) -
        (a.AverageRating ?? a.averageRating ?? 0)
    );

    const labels = sorted.map(d => d.DepartmentName ?? d.departmentName ?? '');
    const ratings = sorted.map(d =>
      parseFloat((d.AverageRating ?? d.averageRating ?? 0).toFixed(2))
    );

    const maxRating = Math.max(...ratings, 1);
    const barColors = ratings.map(r => {
      const alpha = 0.45 + (r / maxRating) * 0.55;
      return `rgba(99, 69, 210, ${alpha})`;
    });

    this.departmentWiseRatingChartOptions = {
      backgroundColor: 'transparent',
      title: {
        text: 'Average Rating by Department',
        left: 'center',
        top: 0,
        textStyle: {
          fontSize: 14,
          fontWeight: 'bold',
          color: textColor
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' },
        formatter: (params: any) => {
          const p = Array.isArray(params) ? params[0] : params;
          return `${p.name}<br/>  Rating: ${Number(p.value).toFixed(2)} / 5.00`;
        },
        backgroundColor: 'rgba(17,24,39,0.92)',
        textStyle: { fontSize: 12, color: '#fff' },
        padding: 10,
        borderWidth: 0,
        borderRadius: 6
      },
      grid: {
        left: 10,
        right: 55,
        top: 40,
        bottom: 10,
        containLabel: true
      },
      xAxis: {
        type: 'value',
        min: 0,
        max: 5,
        interval: 1,
        axisLabel: {
          fontSize: 11,
          color: textColor,
          formatter: (value: number) => value.toFixed(0)
        },
        splitLine: { lineStyle: { color: borderColor } },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      yAxis: {
        type: 'category',
        data: labels,
        inverse: true,
        axisLabel: {
          fontSize: 11,
          fontWeight: 500,
          color: textColor,
          align: 'right'
        },
        axisLine: { show: false },
        axisTick: { show: false }
      },
      series: [
        {
          name: 'Average Rating',
          type: 'bar',
          data: ratings.map((val, i) => ({
            value: val,
            itemStyle: {
              color: barColors[i],
              borderRadius: [0, 6, 6, 0]
            }
          })),
          barWidth: '65%',
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => Number(params.value).toFixed(2),
            fontSize: 11,
            fontWeight: 'bold',
            color: '#4338ca'
          }
        }
      ]
    };

    this.departmentChartHeight = Math.max(220, sorted.length * 50 + 90);
  }

}