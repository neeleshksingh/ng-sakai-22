import { Component, Input, SimpleChanges } from '@angular/core';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { MessageService } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import { environment } from 'src/environments/environment';
import { ProvisionalFeeReceiptResponse } from '../../models/provisional-fee-receipt';
import { StudentProgramProvisionalService } from '../../services/student-program-provisional.service';

@Component({
  selector: 'app-fee-receipt',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './fee-receipt.component.html',
  styleUrl: './fee-receipt.component.scss'
})
export class FeeReceiptComponent {
  @Input() reciptNumber: string = "";
  provisionalFeeReceiptResponse!: ProvisionalFeeReceiptResponse;
  feeReceiptDetails: any[] = [];
  image_Url: string = '';
  title: string = '';
  address: string = "";

  constructor(
    private studentProgramProvisionalService: StudentProgramProvisionalService,
    private messageService: MessageService
  ) { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['reciptNumber']) {
      const newVal = changes['reciptNumber'].currentValue;
      this.studentProgramProvisionalService
        .GetProvisionalFeeReceiptResponseByReceiptNumber(this.reciptNumber)
        .subscribe(
          (response) => {
            this.provisionalFeeReceiptResponse = response;
            this.prepareData();
          },
          (error) => {
            this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Something went wrong!', life: 3000 });
          }
        );
    }
  }
  ngOnInit(): void {
    this.image_Url = environment.partner.logo_url;
    this.title = environment.partner.title;
    this.address = environment.partner.address;
    if (environment.partner.partnerCode === 'P10002') {
      this.image_Url = "../../../../assets/partner-images/P10002/sbu-logo.jpg";
    } else if (environment.partner.partnerCode === 'P10001') {
      this.image_Url = "../../../../assets/partner-images/P10001/partner-full-logo.jpg";
    }

    this.studentProgramProvisionalService
      .GetProvisionalFeeReceiptResponseByReceiptNumber(this.reciptNumber)
      .subscribe(
        (response) => {
          this.provisionalFeeReceiptResponse = response;
          this.prepareData();
        },
        (error) => {
          this.messageService.add({ severity: 'warn', summary: 'Error', detail: 'Something went wrong!', life: 3000 });
        }
      );
  }

  prepareData(): void {
    if (this.provisionalFeeReceiptResponse?.feeReceiptDetails) {
      this.feeReceiptDetails = this.provisionalFeeReceiptResponse.feeReceiptDetails.map(
        (detail: any) => ({
          feeComponentId: detail.feeComponentId,
          paidAmount: detail.paidAmount,
          lastDueAmount: detail.lastDueAmount,
          operationalVerticalId: detail.operationalVerticalId
        })
      );
    }
  }

  getFeeComponentName(feeComponentId: number): string {
    const feeComponents = this.provisionalFeeReceiptResponse?.feeComponents;
    const feeComponent = feeComponents?.find(
      (component) => component.id === feeComponentId
    );
    return feeComponent ? (feeComponent.name ?? 'N/A') : 'N/A';
  }

  downloadPDF(): void {
    if (!this.provisionalFeeReceiptResponse) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Receipt data not loaded yet!', life: 3000 });
      console.error('downloadPDF: provisionalFeeReceiptResponse is null or undefined');
      return;
    }

    const element = document.querySelector('.pdf-receipt-container') as HTMLElement;
    if (!element) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'PDF container not found in DOM', life: 3000 });
      console.error('downloadPDF: .pdf-receipt-container not found');
      return;
    }

    const originalDisplay = element.style.display;
    element.style.display = 'block';
    element.style.position = 'absolute';
    element.style.left = '-9999px';

    const logoImg = new Image();
    logoImg.crossOrigin = 'Anonymous';
    logoImg.src = this.image_Url || 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='; // Fallback blank image

    const generatePDF = () => {
      html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
        width: 800,
        height: element.scrollHeight
      }).then((canvas) => {
        if (canvas.width === 0 || canvas.height === 0) {
          throw new Error('Canvas is empty or invalid');
        }

        const imgData = canvas.toDataURL('image/jpeg', 1.0);
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 190;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const pageHeight = 297;

        let heightLeft = imgHeight;
        let position = 10;

        pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight, undefined, 'FAST');

        while (heightLeft > pageHeight) {
          position = heightLeft - imgHeight + 10;
          pdf.addPage();
          pdf.addImage(imgData, 'JPEG', 10, position, imgWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pageHeight;
        }

        pdf.save(`Fee_Receipt_${this.reciptNumber}.pdf`);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'PDF downloaded successfully', life: 3000 });

        element.style.display = originalDisplay;
        element.style.position = '';
        element.style.left = '';
      }).catch((error) => {
        console.error('downloadPDF: html2canvas or jsPDF error', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to generate PDF: ' + error.message, life: 3000 });
        element.style.display = originalDisplay;
        element.style.position = '';
        element.style.left = '';
      });
    };

    logoImg.onload = () => {
      const domImg = element.querySelector('.pdf-logo-img') as HTMLImageElement;
      if (domImg) {
        domImg.src = logoImg.src;
      } else {
        console.warn('downloadPDF: .pdf-logo-img not found, proceeding without logo update');
      }
      setTimeout(generatePDF, 200);
    };

    logoImg.onerror = () => {
      console.warn('downloadPDF: Logo failed to load, using fallback');
      const domImg = element.querySelector('.pdf-logo-img') as HTMLImageElement;
      if (domImg) {
        domImg.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
      }
      setTimeout(generatePDF, 200);
    };
  }
}
