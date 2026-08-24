import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ExaminationType } from 'src/app/shared/models/knowledge-stand/examination-type';
import { environment } from 'src/environments/environment';
@Injectable({
    providedIn: 'root'
})
export class ExaminationTypeService {

    constructor(private http: HttpClient,private messageService: MessageService) { }

    getByIntId(id: number) {
        return this.http.get<ExaminationType>(environment.apiStudentsUrl + '/ExaminationType/GetByIntId/'+id)
    }

    getExaminationTypeList() {
        var examinationTypeList:ExaminationType[]=[];
        var examinationTypeListString = localStorage.getItem('examinationTypeList');
        if(examinationTypeListString){
            examinationTypeList= JSON.parse(examinationTypeListString);
            return examinationTypeList
        }else{

        }
         this.http.get<ExaminationType[]>(environment.apiStudentsUrl + '/ExaminationType/GetAll').subscribe(response=>{
            localStorage.setItem('examinationTypeList', JSON.stringify(response));
            examinationTypeList = response;
            return examinationTypeList;
        }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
        });
        return examinationTypeList;
            
    }
}
