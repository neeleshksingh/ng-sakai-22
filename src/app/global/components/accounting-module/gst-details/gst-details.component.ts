import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { DropdownModule } from "primeng/dropdown";
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { EnumsService } from 'src/app/finance-Pro/services/enums.service';
import { statusList } from 'src/app/shared/models/commons/selectItems';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-gst-details',
  standalone: true,
  imports: [DropdownModule, InputTextModule, InputTextareaModule, ReactiveFormsModule],
  templateUrl: './gst-details.component.html',
  styleUrl: './gst-details.component.scss'
})
export class GstDetailsComponent {
  statusList: SelectItem[] = statusList;
  gstRegistrationTypeList: SelectItem[] = [];
  @Input() gstForm: FormGroup = new FormGroup({});

  constructor(private enumService: EnumsService, private utilityService: UtilityService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.enumService.getGstRegistrationTypes().subscribe({
      next: data => {
        var lists = [];
        for (var i = 0; i < data.length; i++) {
          lists.push({ label: data[i].name, value: data[i].id });
        }
        this.gstRegistrationTypeList = this.utilityService.reduceDuplicates(lists);
      }, error: error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 3000, });
      }
    })
  }
}