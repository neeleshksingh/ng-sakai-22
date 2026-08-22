import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './app.footer.html',
    styleUrl: './app.footer.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppFooter {}
