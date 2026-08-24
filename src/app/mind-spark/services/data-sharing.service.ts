import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AcademicsDataSharingService {
    PaperCodeModuleSubModuledropdownMenuSelectedItems: any[] = [];

  constructor() {}

  savePaperCodeModuleSubModuleData(subjectId: number, paperCodeId: number, version: string) {
    this.PaperCodeModuleSubModuledropdownMenuSelectedItems = [];
    this.PaperCodeModuleSubModuledropdownMenuSelectedItems.push({
      subjectId: subjectId,
      paperCodeId: paperCodeId,
      version: version
    });
  }

  getPaperCodeModuleSubModuledropdownMenuSelectedItems() {
    return this.PaperCodeModuleSubModuledropdownMenuSelectedItems;
  }
}