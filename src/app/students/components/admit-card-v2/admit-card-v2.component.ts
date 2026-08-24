import { Component, SecurityContext } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';
import { MessageService, SelectItem } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { StudentProgram } from 'src/app/shared/models/mindspark/student-program';
import { ExaminationHallTicketSearch } from 'src/app/shared/models/students/examination-hall-ticket';
import { StudentExaminationByAcadmicSession } from 'src/app/shared/models/students/student-examination-by-acadmic-session';
import { ExaminationHallTicketService } from '../../services/examination-hall-ticket.service';
import { ExaminationService } from '../../services/examination.service';
import { StudentProgramService } from '../../services/student-program.service';

@Component({
  selector: 'app-admit-card-v2',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './admit-card-v2.component.html',
  styleUrl: './admit-card-v2.component.scss'
})
export class AdmitCardV2Component {
  componentName: string = "Download Admit Card"

  programList: SelectItem[] = [];
  operationalVerticalList: SelectItem[] = [];
  examinationList: SelectItem[] = [];
  academicSessionList: SelectItem[] = [];

  examinationHallTicketSearch: ExaminationHallTicketSearch = {};
  studentPrograms: StudentProgram[] = [];
  studentExaminationByAcadmicSession: StudentExaminationByAcadmicSession[] = [];

  hallTicketFormGroup!: FormGroup;
  downloadByAdmitCardLink: SafeUrl = "";
  isAdmitCardPublished: boolean = true;
  resultMessage: string = "";
  safeHtmlContents: SafeHtml[] = [];


  constructor(
    private fb: FormBuilder,
    private studentProgramService: StudentProgramService,
    private messageService: MessageService,
    private examinationHallTicketService: ExaminationHallTicketService,
    private examinationService: ExaminationService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.initializeHallTicketFormGroup();
    this.examinationHallTicketSearch = {};
    this.GetStudentProgramDetails();
  }

  initializeHallTicketFormGroup() {
    this.hallTicketFormGroup = this.fb.group({
      id: 0,
      programId: ['', Validators.required],
      operationalVerticalId: ['', Validators.required],
      academicSessionId: ['', Validators.required],
      examinationId: ['', Validators.required],
      registrationNumber: ['']
    });
  }

  GetStudentProgramDetails() {
    this.studentPrograms = [];
    this.studentProgramService.getStudentProgramList().subscribe({
      next: (data) => {
        this.studentPrograms = data;
        this.academicSessionList = data.reduce((accumalator: any, current: any) => {
          if (!accumalator.some((x: any) => x.label == current.academicSessionName && x.value == current.academicSessionId)) {
            accumalator.push({ label: current.academicSessionName, value: current.academicSessionId });
          }
          return accumalator;
        }, []);
      },
      error: (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
      }
    })
  }

  onAcademicChanged(event: { value: number | undefined; }) {
    if (event.value) {
      this.examinationHallTicketSearch.academicSessionId = event.value;
      this.programLoad(this.examinationHallTicketSearch.academicSessionId);
    }
  }

  programLoad(academicSessionId: number | undefined) {
    var result = this.studentPrograms.filter(x => x.academicSessionId == academicSessionId);
    if (result) {
      this.programList = [];
      this.programList = result.reduce((accumalator: any, current: any) => {
        if (!accumalator.some((x: any) => x.label == current.programName && x.value == current.programId)) {
          accumalator.push({ label: current.programName, value: current.programId });
        }
        return accumalator;
      }, []);
      this.programList.sort((a, b) => { return a.value - b.value; });
    }
  }

  onProgramChanged(event: { value: number | undefined; }) {
    if (event.value) {
      var result = this.studentPrograms.filter(x => x.programId == event.value);
      this.examinationHallTicketSearch.programId = event.value;
      this.examinationHallTicketSearch.registrationNumber = result[0].registrationNumber;
      if (result) {
        this.operationalVerticalList = result.reduce((accumalator: any, current: any) => {
          if (!accumalator.some((x: any) => x.label == current.operationalVerticalName && x.value == current.operationalVerticalId)) {
            accumalator.push({ label: current.operationalVerticalName, value: current.operationalVerticalId });
          }
          return accumalator;
        }, []);
        this.operationalVerticalList.sort((a, b) => { return a.value - b.value; });
      }
    }
  }

  onOperationalVerticalChanged(event: { value: number | undefined; }) {
    if (event.value) {
      this.examinationHallTicketSearch.operationalVerticalId = event.value;
      this.getActiveExaminationByAcadmicSession();
    }
  }

  getActiveExaminationByAcadmicSession() {
    this.examinationService.getActiveExaminationByAcadmicSession(this.examinationHallTicketSearch.academicSessionId ?? 0,
      this.examinationHallTicketSearch.programId ?? 0, this.examinationHallTicketSearch.operationalVerticalId ?? 0,
      this.examinationHallTicketSearch.registrationNumber ?? "").subscribe({
        next: (data: any) => {
          this.studentExaminationByAcadmicSession = data;
          this.examinationList = [];
          this.examinationList = data.reduce((accumalator: any, current: any) => {
            if (!accumalator.some((x: any) => x.label == current.examinationTypeName && x.value == current.id)) {
              accumalator.push({ label: current.examinationTypeName, value: current.id });
            }
            return accumalator;
          }, []);
        },
        error: (error: any) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
        }
      })
  }

  onExaminationChanged(event: { value: number | undefined; }) {
    if (event.value) {
      this.examinationHallTicketSearch.examinationId = event.value;
    }
  }

  viewHallTicket() {
    this.examinationHallTicketService.downloadHTMLByExaminationHallTicketSearchRequest(this.examinationHallTicketSearch).subscribe((data: any) => {
      this.safeHtmlContents = data.htmlContent.map((html: any) =>
        this.sanitizer.bypassSecurityTrustHtml(html)
      );
    }, err => {
      this.isAdmitCardPublished = false;
      this.resultMessage = err.error.message;
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
    });
  }

  printAdmitCard() {
    // Open a new window for printing
    const printWindow = window.open('', '_blank');

    if (!printWindow) {
      console.error('Unable to open print window. It might be blocked by the browser.');
      return;
    }

    // Get the HTML content from the API response
    const admitCardHtml = this.safeHtmlContents[0]; // Assuming it's the first item

    // Create the print content with improved styling
    let printContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Admit Card</title>
        <style>
          * {
            box-sizing: border-box;
          }
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          table {
            width: 95%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 5px;
          }
          .watermarked {
            position: relative;
          }
          .logo {
            max-width: 185px;
            height: auto;
          }
          @page {
            size: A4 portrait;
            margin: 10mm;
          }
          @media print {
            body {
              padding: 0;
              margin: 0;
            }
            .watermarked {
              page-break-inside: avoid;
            }
            table {
              page-break-inside: avoid;
            }
            .container{
              width: 95%;
            }
            /* Ensure borders print completely */
            table, th, td {
              border: 1px solid black !important;
            }
            /* Fix for right border cutting */
            html, body {
              width: 95%;
              overflow: visible;
            }
            /* Force full width for tables */
            table#Result, table#Result + table {
              width: 95% !important;
              max-width: 95% !important;
            }
            /* Ensure photo cell has proper borders */
            table tr td[rowspan] {
              border: 1px solid black !important;
            }
          }
        </style>
      </head>
      <body>
        ${this.sanitizer.sanitize(SecurityContext.HTML, admitCardHtml)}
      </body>
      </html>
    `;

    // Write the content to the new window
    printWindow.document.open();
    printWindow.document.write(printContent);
    printWindow.document.close();

    // Wait for content to load before printing
    printWindow.onload = function () {
      setTimeout(() => {
        // Additional fixes for printing
        const style = printWindow.document.createElement('style');
        style.innerHTML = `
          @media print {
            /* Ensure all borders are visible */
            table, th, td {
              border-color: #000 !important;
            }
            /* Fix for potential right border cutoff */
            body {
              padding-right: 20mm;
            }
            /* Make sure tables don't overflow */
            table {
              max-width: 95% !important;
              width: 95% !important;
            }
          }
        `;
        printWindow.document.head.appendChild(style);

        printWindow.print();
        printWindow.close();
      }, 500);
    };
  }
}
