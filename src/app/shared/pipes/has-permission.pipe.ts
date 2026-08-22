import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'hasPermission', standalone: true })
export class HasPermissionPipe implements PipeTransform {
    transform(): boolean {
        return true;
    }
}
