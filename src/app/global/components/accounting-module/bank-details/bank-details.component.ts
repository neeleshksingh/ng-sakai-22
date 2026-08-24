import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { statusList } from 'src/app/shared/models/commons/selectItems';

@Component({
  selector: 'app-bank-details',
  standalone: true,
  imports: [DropdownModule, InputTextModule, InputTextareaModule, ReactiveFormsModule],
  templateUrl: './bank-details.component.html',
  styleUrl: './bank-details.component.scss'
})
export class BankDetailsComponent {
  statusList: SelectItem[] = statusList;
  @Input() bankForm: FormGroup = new FormGroup({});
}
