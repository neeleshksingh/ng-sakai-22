import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'reduceDuplicatesSelectItem', standalone: true })
export class ReduceDuplicatesSelectItemPipe implements PipeTransform {
    transform<T>(items: T[], key: keyof T): T[] {
        return [...new Map(items.map((item) => [item[key], item])).values()];
    }
}
