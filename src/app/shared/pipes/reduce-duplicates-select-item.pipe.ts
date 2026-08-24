import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from 'primeng/api';

@Pipe({
  name: 'reduceDuplicatesSelectItem',
  standalone: true
})
export class ReduceDuplicatesSelectItemPipe implements PipeTransform {

  transform(list: any[], labelKey: string, valueKey: string, sortOrder: string = 'asc', sortBy: 'label' | 'value' = 'label'): SelectItem[] {
    const filteredList = list.filter(item => 
      (item.status !== undefined && item.status === 'PUBLISHED') || item.status === undefined
    );
    const mappedList = filteredList.map(item => ({ label: item[labelKey], value: item[valueKey] }));
    const uniqueList = this.reduceDuplicates(mappedList);

    return this.sortList(uniqueList, sortOrder, sortBy);
  }

  reduceDuplicates(list: SelectItem[]): SelectItem[] {
    const uniqueList = list.reduce((acc, current) => {
      if (!acc.some(x => x.label === current.label && x.value === current.value)) {
        acc.push(current);
      }
      return acc;
    }, [] as SelectItem[]);
    return uniqueList;
  }

  sortList(list: SelectItem[], sortOrder: string, sortBy: 'label' | 'value'): SelectItem[] {
    return list.sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      let comparison: number;

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue;
      } else {
        comparison = (String(aValue ?? '')).localeCompare(String(bValue ?? ''));
      }

      return sortOrder === 'desc' ? -comparison : comparison;
    });
  }
}