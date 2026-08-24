import { Directive, HostListener, Input } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[pAddRowOVSMSM]'
})
export class AddRowOVSMSMDirective {
  @Input() table1: Table = {} as Table;
  @Input() newRowOVSMSM: any;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
   
    // Insert a new row
    this.table1.value.push(this.newRowOVSMSM);

    // Set the new row in edit mode
    this.table1.initRowEdit(this.newRowOVSMSM);

    event.preventDefault();
  }
}