import { Injectable } from '@angular/core';

export interface SelectItem {
    label: string;
    value: any;
}

export type SelectItemSort = 'label' | 'value';

@Injectable({
    providedIn: 'root',
})
export class UtilityService {
    reduceDuplicates(list: SelectItem[]): SelectItem[] {
        return list.reduce((acc, current) => {
            if (!acc.some((item) => item.label === current.label && item.value === current.value)) {
                acc.push(current);
            }
            return acc;
        }, [] as SelectItem[]);
    }

    getFilteredSelectItems<T extends object>(
        source: readonly T[],
        labelKey: keyof T,
        valueKey: keyof T,
        filters: Partial<T> = {},
        sortBy?: SelectItemSort
    ): SelectItem[] {
        const filterEntries = Object.entries(filters) as Array<[keyof T, unknown]>;
        const uniqueItems = new Map<string | number, string>();

        source.forEach(item => {
            const matchesFilters = filterEntries.every(([key, value]) => item[key] === value);
            if (!matchesFilters) {
                return;
            }

            const label = item[labelKey];
            const value = item[valueKey];

            if (
                typeof label === 'string' && label.length > 0 &&
                (typeof value === 'string' || typeof value === 'number')
            ) {
                uniqueItems.set(value, label);
            }
        });

        const selectItems = Array.from(uniqueItems, ([value, label]) => ({ label, value }));

        if (sortBy === 'label') {
            return selectItems.sort((first, second) => first.label.localeCompare(second.label));
        }

        if (sortBy === 'value') {
            return selectItems.sort((first, second) => {
                if (typeof first.value === 'number' && typeof second.value === 'number') {
                    return first.value - second.value;
                }

                return String(first.value).localeCompare(String(second.value));
            });
        }

        return selectItems;
    }
}
