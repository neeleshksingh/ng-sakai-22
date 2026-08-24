import { Component } from '@angular/core';
import { SharedModule } from '@/shared.module';

@Component({
  selector: 'app-payment-help',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './payment-help.component.html',
  styleUrl: './payment-help.component.scss'
})
export class PaymentHelpComponent {

}
