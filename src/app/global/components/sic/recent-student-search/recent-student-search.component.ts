import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SharedModule } from '@/shared.module';

@Component({
  selector: 'app-recent-student-search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './recent-student-search.component.html',
  styleUrl: './recent-student-search.component.scss'
})
export class RecentStudentSearchComponent {
  @Input() recentStudents: { studentId: string; imageUrl: string; studentName: string }[] = [];
  @Output() displayRecent = new EventEmitter<boolean>();
  constructor(private router: Router) { }

  private moduleConfig: Record<
    string,
    { reportType: string; moduleIndex: string }
  > = {
      mindspark: { reportType: 'academic', moduleIndex: '1' },
      knowledgestand: { reportType: 'examination', moduleIndex: '2' },
      finpro: { reportType: 'fee-ledger', moduleIndex: '3' },
      default: { reportType: 'general', moduleIndex: '0' },
    };

  onStudentSelect(studentId: string): void {
    const currentModule = this.determineModule(this.router.url);
    const config = this.moduleConfig[currentModule] || this.moduleConfig['default'];
    this.router.navigate(
      [
        `/home/${currentModule}/reports/students/student-information-center/${config.reportType}/${studentId}/${config.moduleIndex}`,
      ],
      { replaceUrl: true }
    );
    this.displayRecent.emit(false);
  }

  private determineModule(url: string): string {
    if (url.toLowerCase().includes('mindspark')) return 'mindspark';
    if (url.toLowerCase().includes('knowledgestand')) return 'knowledgestand';
    if (url.toLowerCase().includes('finpro')) return 'finpro';
    return 'default';
  }
}