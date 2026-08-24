import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class CsvFileProcessService {

  constructor() { }

  public exportAsCsvFile<T extends object>(json: T | T[], csvFileName: string): void {
    const jsonArray: T[] = Array.isArray(json) ? json : [json];
    const csvString = this.convertToCsv(jsonArray);
    this.saveAsCsvFile(csvString, csvFileName);
  }

  private convertToCsv<T extends object>(jsonArray: T[]): string {
    if (jsonArray.length === 0) {
      return '';
    }

    const headers = Object.keys(jsonArray[0]);
    const rows = jsonArray.map(item =>
      headers.map(header => this.formatCsvValue((item as any)[header])).join(',')
    );

    return [headers.join(','), ...rows].join('\n');
  }

  private formatCsvValue(value: any): string {
    if (value === null || value === undefined) {
      return '';
    }
    // Escape double quotes and wrap in double quotes if needed
    const escapedValue = ('' + value).replace(/"/g, '""');
    return `"${escapedValue}"`;
  }

  private saveAsCsvFile(csvString: string, fileName: string): void {
    const CSV_TYPE = 'text/csv;charset=UTF-8';
    const CSV_EXTENSION = '.csv';
    const data: Blob = new Blob([csvString], { type: CSV_TYPE });
    FileSaver.saveAs(data, `${fileName}_export_${new Date().getTime()}${CSV_EXTENSION}`);
  }
}