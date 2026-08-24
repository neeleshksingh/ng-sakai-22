import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { PartnerImage, PartnerUploadImage } from 'src/app/shared/models/cloudbytes/partner';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PartnerImageService extends GenericService<PartnerImage, PartnerImage> {

    constructor(http: HttpClient,  messageService: MessageService) {
        super(http, messageService, "PartnerImage", environment.apiMastersUrl);
    }

    uploadPartnerImageById(partnerUploadImage: PartnerUploadImage, formData: any) {
        return this.http.post<PartnerUploadImage>(environment.apiMastersUrl + '/PartnerImage/UploadPartnerImageById/PartnerImageId/' + partnerUploadImage.partnerImageId + '/PartnerImageType/' + partnerUploadImage.partnerImageType, formData);
    }
}