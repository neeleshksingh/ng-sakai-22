import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { PublishNotice } from "src/app/shared/models/executiveedge/publish-notice";
import { GenericService } from "src/app/shared/services/generic.service";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: 'root'
})
export class PublishNoticeService extends GenericService<PublishNotice,PublishNotice>{
    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Notice", environment.apiExecutiveEdgeUrl);
    }

    getByNoticeType(noticeType: string) {
        return this.http.get<PublishNotice[]>(environment.apiExecutiveEdgeUrl + '/Notice/GetByNoticeType/' + noticeType);
      }

      uploadDocumentByPublishNoticeId(id: number, formData: FormData) {
        return this.http.post<PublishNotice>(environment.apiExecutiveEdgeUrl + '/Notice/UploadDocument/' + id, formData);
      }
}