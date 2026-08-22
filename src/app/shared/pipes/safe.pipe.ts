import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({ name: 'safe', standalone: true })
export class SafePipe implements PipeTransform {
    private readonly sanitizer = inject(DomSanitizer);

    transform(value: string, type: 'html' | 'resourceUrl' = 'html'): SafeHtml | SafeResourceUrl {
        return type === 'resourceUrl' ? this.sanitizer.bypassSecurityTrustResourceUrl(value) : this.sanitizer.bypassSecurityTrustHtml(value);
    }
}
