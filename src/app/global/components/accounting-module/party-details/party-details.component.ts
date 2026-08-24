import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { countryList, statusList } from 'src/app/shared/models/commons/selectItems';

@Component({
  selector: 'app-party-details',
  standalone: true,
  imports: [DropdownModule, InputTextModule, InputTextareaModule, ReactiveFormsModule],
  templateUrl: './party-details.component.html',
  styleUrl: './party-details.component.scss'
})
export class PartyDetailsComponent {
  statusList: SelectItem[] = statusList;
  countryList: SelectItem[] = countryList;
  @Input() partyForm: FormGroup = new FormGroup({});
}
