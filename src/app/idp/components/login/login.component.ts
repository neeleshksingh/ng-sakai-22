import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthenticationService } from '../../services/authentication-service.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [FormsModule, RouterLink, ButtonModule, CheckboxModule, InputTextModule, PasswordModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
    private readonly authenticationService = inject(AuthenticationService);
    private readonly router = inject(Router);
    userName = 'john.doe@ncorepro.edu';
    password = 'password';
    rememberMe = true;

    login(): void {
        this.authenticationService.login(this.userName).subscribe(() => void this.router.navigate(['/home/dashboard']));
    }
}
