import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CancelledReceipt } from 'src/app/shared/models/finance-Pro/cancelled-receipt';
import { FeeReceipt } from 'src/app/shared/models/finance-Pro/fee-receipt';
import { FeeReceiptDownloadRequest } from 'src/app/shared/models/finance-Pro/fee-receipt-download-request';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class FeeReceiptService {
    constructor(private http: HttpClient) { }

    getFeeReceiptByRegistrationNumber(
        registrationNumber: string
    ): Observable<FeeReceipt[]> {
        return this.http.get<FeeReceipt[]>(
            `${environment.apiAccountsUrl}/Payment/GetFeeReceiptByRegistrationNumber/${registrationNumber}`
        );
    }

    downloadFeeReceipt(
        feeReceiptDownloadRequest: FeeReceiptDownloadRequest
    ): Observable<Blob> {
        return this.http.post<Blob>(
            `${environment.apiAccountsUrl}/Payment/DownloadFeeReceipt`,feeReceiptDownloadRequest,
            { responseType: 'blob' as 'json' }
        );
    }

    cancelFeeReceipt(
        cancelFeeReceipt: CancelledReceipt
    ): Observable<CancelledReceipt> {
        return this.http.post<CancelledReceipt>(
            `${environment.apiAccountsUrl}/Payment/CancelFeeReceipt`, cancelFeeReceipt
        );
    }
}
