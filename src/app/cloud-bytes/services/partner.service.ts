import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Partner } from 'src/app/shared/models/cloudbytes/partner';
import { GenericService } from 'src/app/shared/services/generic.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PartnerService extends GenericService<Partner, Partner> {
    private destroy$ = new Subject<void>();

    constructor(http: HttpClient, messageService: MessageService) {
        super(http, messageService, "Partner", environment.apiMastersUrl);
    }

    getByPartnerCode(partnerCode: string): Observable<Partner> {
        return new Observable<Partner>((observer) => {
            this.http.get<Partner>(`${environment.apiMastersUrl}/Partner/GetByPartnerCode/${partnerCode}`)
                .pipe(takeUntil(this.destroy$))
                .subscribe({
                    next: (response: Partner) => {

                        observer.next(response);
                        observer.complete();
                    },
                    error: (error) => {
                        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000 });
                        observer.error(error);
                    }
                });
        });
    }
}