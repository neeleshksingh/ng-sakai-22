import { Injectable } from '@angular/core';
import { PdfHelperService } from './pdf-helper.service';

@Injectable({
  providedIn: 'root'
})
export class PdfFileProcessService {

  constructor(private pdfHelperService: PdfHelperService) { }

  public exportAsPdfFile<T extends object>(
    data: T[],
    cols: { field: string, header: string }[],
    pdfFileName: string,
    orientation: 'portrait' | 'landscape' = 'portrait'
  ): void {
    import('jspdf').then(jsPDF => {
      import('jspdf-autotable').then(() => {
        const doc = new jsPDF.default({ orientation: orientation });

        const columns = this.pdfHelperService.generateColumns(data, cols);

        const formattedData = data.map(item =>
          columns.map(col => item[col.dataKey as keyof T] ?? '')
        );

        const titleWidth = doc.getStringUnitWidth(pdfFileName) * 16 / doc.internal.scaleFactor;
        const titleX = (doc.internal.pageSize.width - titleWidth) / 2;

        doc.setFontSize(12);
        doc.text(pdfFileName, titleX, 10);

        (doc as any).autoTable({
          columns: columns,
          body: formattedData
        });

        doc.save(`${pdfFileName}_export_${new Date().getTime()}.pdf`);
      });
    });
  }
}