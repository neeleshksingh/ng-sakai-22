import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PdfHelperService {

    public generateColumns<T extends object>(data: T[], cols: { field: string, header: string }[]) {
        return Object.keys(data[0]).map((key) => {
            const col = cols.find(c => c.field === key);
            return {
                header: col?.header || key,
                dataKey: key as string
            };
        });
    }
}