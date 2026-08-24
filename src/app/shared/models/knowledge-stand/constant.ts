
import { Injectable } from "@angular/core";
import { SelectItem } from "primeng/api";

@Injectable({
    providedIn: 'root'
})
export class ConstantData {

    pageSizeDefault: number = 10;

    //Status
    published: string = "PUBLISHED";

    // Page Tab Name
    ExaminationProgramSearchTitle: string = "Examination Program Search";
    ExaminationProgramConfigurationSearchTitle: string = "Examination Program Configuration Search";
    attendanceStatusList: SelectItem[] = [
        { label: 'ABSENT', value: 'AB' },
        { label: 'UNFAIR MEANS', value: 'UF' },
        { label: 'WITHDRAW', value: 'WD' },
        { label: 'DROP', value: 'DR' },
        { label: 'MEDICAL', value: 'MD' },
        { label: 'SPECIAL ALLOWANCE', value: 'SA' }
    ];
    statusList = [
        { label: 'NEW', value: 'NEW' },
        { label: 'PUBLISHED', value: 'PUBLISHED' },
        { label: 'DELETED', value: 'DELETED' },
        { label: 'DRAFT', value: 'DRAFT' }
    ];
}