import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SharedModule } from '@/shared.module';

@Component({
    selector: 'app-cgpa-conversion-certificate',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './cgpa-conversion-certificate.component.html',
    styleUrl: './cgpa-conversion-certificate.component.scss',
})
export class CgpaConversionCertificateComponent {
    componentName: string = 'CGPA to % Conversion Certificate';
    readonly certificateDownloadUrl: string =
        '/assets/Partner_Documents/Common/CgpaToPercentageConversionCertificate.pdf';
    readonly certificatePreviewUrl: SafeResourceUrl;

    constructor(private sanitizer: DomSanitizer) {
        this.certificatePreviewUrl =
            this.sanitizer.bypassSecurityTrustResourceUrl(
                this.certificateDownloadUrl,
            );
    }
}
