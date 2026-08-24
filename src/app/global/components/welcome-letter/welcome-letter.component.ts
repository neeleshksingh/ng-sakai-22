import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-welcome-letter',
  standalone: true,
  imports: [],
  templateUrl: './welcome-letter.component.html',
  styleUrl: './welcome-letter.component.scss'
})
export class WelcomeLetterComponent {
  @Input() studentName: string = '';
}
