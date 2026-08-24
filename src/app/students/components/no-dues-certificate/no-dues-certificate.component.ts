import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { forkJoin } from 'rxjs';
import { SharedModule } from '@/shared.module';
import { StudentFamilyService } from '../../services/student-family.service';
import { StudentFeeMasterService } from '../../services/student-fee-master.service';
import { StudentProgramService } from '../../services/student-program.service';
import { StudentService } from '../../services/student.service';

@Component({
    selector: 'app-no-dues-certificate',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './no-dues-certificate.component.html',
    styleUrl: './no-dues-certificate.component.scss',
})
export class NoDuesCertificateComponent {
    @ViewChild('certificateWrapper') certificateWrapper!: ElementRef;
    componentName: string = 'No Dues Certificate';
    studentForm!: FormGroup;
    image_Url!: string;
    userdata: any;
    totalFee: number = 0;
    paidFee: number = 0;
    isDisplay: boolean = false;
    isLastSem: boolean = false;
    canShowCertificate: boolean = false;

    private toNumber(value: any): number {
        const parsed = Number(value ?? 0);
        return Number.isFinite(parsed) ? parsed : 0;
    }

    private updateCertificateVisibility(): void {
        this.canShowCertificate = this.isLastSem && this.isDisplay;
    }

    private formatStudentDob(dob: any): string {
        if (!dob) {
            return '';
        }

        const date = new Date(dob);
        if (Number.isNaN(date.getTime())) {
            return '';
        }

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    constructor(
        private fb: FormBuilder,
        private studentProgramService: StudentProgramService,
        private studentFeeMasterService: StudentFeeMasterService,
        private studentFamilyService: StudentFamilyService,
        private studentService: StudentService,
        private messageService: MessageService,
    ) { }

    ngOnInit(): void {
        this.initializeStudentProgramFormGroup();
        const storedUser = localStorage.getItem('currentUser');
        const user = storedUser ? JSON.parse(storedUser) : null;
        this.studentProgramService.getStudentProgramList().subscribe({
            next: (res) => {
                if (!res || res.length === 0) {
                    return;
                }

                const data =
                    res.find((item) => item.isCurrentOperationalVertical) ||
                    res[0];
                const maxOperationalVertical = Math.max(
                    ...res.map((item) => item.operationalVerticalId || 0),
                );
                const latestProgram = res.find(
                    (item) =>
                        (item.operationalVerticalId || 0) ===
                        maxOperationalVertical,
                );
                this.isLastSem = !!latestProgram?.isCurrentOperationalVertical;
                this.updateCertificateVisibility();

                const payload: any = {
                    academicSessionIds: data.academicSessionId,
                    studentIds: data.studentId,
                    registrationNumber: data.registrationNumber,
                    programId: data.programId,
                    operationalVerticalId: 0,
                    feeComponentId: 0,
                };

                forkJoin({
                    feeRes: this.studentFeeMasterService.getStudentFeeMasterList(
                        [payload],
                    ),
                    familyRes: this.studentFamilyService.GetStudentFamily(),
                    profileRes: this.studentService.GetStudentProfile(),
                }).subscribe({
                    next: ({ feeRes, familyRes, profileRes }) => {
                        const normalizedFeeRes = Array.isArray(feeRes)
                            ? feeRes
                            : [];

                        this.totalFee = normalizedFeeRes.reduce(
                            (sum: number, item: any) =>
                                sum + this.toNumber(item?.feeAmount),
                            0,
                        );
                        this.paidFee = normalizedFeeRes.reduce(
                            (sum: number, item: any) =>
                                sum + this.toNumber(item?.paidAmount),
                            0,
                        );
                        this.isDisplay =
                            Math.abs(this.totalFee - this.paidFee) < 0.01;
                        this.updateCertificateVisibility();

                        this.studentForm.patchValue({
                            name: data.studentName,
                            registration: data.registrationNumber,
                            fatherName: this.getParentName(familyRes, 'father'),
                            motherName: this.getParentName(familyRes, 'mother'),
                            studentDob: this.formatStudentDob(profileRes?.dob),
                            session: data.academicSessionName,
                            programme: data.programName,
                            mobileEmail:
                                user?.applicationUser?.phoneNumber || '',
                            feeGenerated: this.totalFee,
                            feePaid: this.paidFee,
                            email: user?.applicationUser?.email || '',
                        });
                    },
                    error: (err) => {
                        this.canShowCertificate = false;
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: err.error.message,
                            life: 3000,
                        });
                    },
                });
            },
            error: (err) => {
                this.canShowCertificate = false;
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: err.error.message,
                    life: 3000,
                });
            },
        });
    }

    private getParentName(
        familyMembers: any[],
        relation: 'father' | 'mother',
    ): string {
        if (!familyMembers || familyMembers.length === 0) {
            return '';
        }

        const member = familyMembers.find((item) =>
            (item.familyRelationName || '').toLowerCase().includes(relation),
        );

        if (!member) {
            return '';
        }

        return [member.firstName, member.middleName, member.lastName]
            .filter((name) => !!name)
            .join(' ')
            .replace(/\s+/g, ' ')
            .trim();
    }

    initializeStudentProgramFormGroup() {
        this.studentForm = this.fb.group({
            name: ['', Validators.required],
            registration: ['', Validators.required],
            fatherName: [''],
            motherName: [''],
            studentDob: [''],
            session: ['', Validators.required],
            programme: ['', Validators.required],
            mobileEmail: ['', [Validators.required]],
            leavingDate: [null, Validators.required],
            reason: ['', Validators.required],
            feeGenerated: ['', Validators.required],
            feePaid: ['', Validators.required],
            email: ['', [Validators.required]],
        });
    }

    async downloadPDF() {
        const pad = 0;
        const W = 210;
        const H = 297;

        const wrapper: HTMLElement = this.certificateWrapper.nativeElement;
        const pages: HTMLElement[] = Array.from(
            wrapper.querySelectorAll<HTMLElement>('.certificate'),
        );

        const pdf = new jsPDF({
            unit: 'mm',
            format: [W + pad * 2, H + pad * 2],
            orientation: 'portrait',
            compress: true,
        });

        for (let i = 0; i < pages.length; i++) {
            const elem = pages[i];
            const canvas = await html2canvas(elem, {
                backgroundColor: '#fff',
                scale: 2.5,
                useCORS: true,
                scrollX: -window.scrollX,
                scrollY: -window.scrollY,
                windowWidth: document.documentElement.clientWidth,
                windowHeight: document.documentElement.clientHeight,
            });
            const imgData = canvas.toDataURL('image/png');
            if (i > 0) {
                pdf.addPage();
            }
            pdf.addImage(imgData, 'PNG', pad, pad, W, H);
        }

        pdf.save('No-Dues-Certificate.pdf');
    }
}
