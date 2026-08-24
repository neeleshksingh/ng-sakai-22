import { Component } from '@angular/core';
import { SharedModule } from '@/shared.module';

@Component({
  selector: 'app-e-learning',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './e-learning.component.html',
  styleUrl: './e-learning.component.scss'
})
export class ELearningComponent {

}
