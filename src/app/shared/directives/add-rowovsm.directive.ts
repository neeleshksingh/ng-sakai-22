import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[appAddRowovsm]', standalone: true })
export class AddRowovsmDirective {
    @HostBinding('class.ncore-table-row') readonly rowClass = true;
}
