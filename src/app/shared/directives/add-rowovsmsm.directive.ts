import { Directive, HostBinding } from '@angular/core';

@Directive({ selector: '[appAddRowovsmsm]', standalone: true })
export class AddRowovsmsmDirective {
    @HostBinding('class.ncore-table-row-compact') readonly rowClass = true;
}
