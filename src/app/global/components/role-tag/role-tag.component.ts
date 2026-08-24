import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-role-tag',
  standalone: true,
  imports: [],
  templateUrl: './role-tag.component.html',
  styleUrl: './role-tag.component.scss'
})
export class RoleTagComponent {
  @Input() role: string = '';
  @Input() variant: 'solid' | 'outline' = 'solid';
}
