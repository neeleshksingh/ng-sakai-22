import { Directive, HostListener, Input } from '@angular/core';
import { Table } from 'primeng/table';

@Directive({
  selector: '[pAddRowOVSM]'
})
export class AddRowOVSMDirective {
  @Input() table: Table = {} as Table;
  @Input() newRowOVSM: any;

  @HostListener('click', ['$event'])
  onClick(event: Event) {
   if(this.newRowOVSM)
   {
    // Insert a new row
    this.table.value.push(this.newRowOVSM);
    // Set the new row in edit mode
    //this.table.initRowEdit(this.newRowOVSM);
   }
   event.preventDefault();
  }
}