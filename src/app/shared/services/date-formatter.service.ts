import { formatDate } from "@angular/common";
import { Injectable } from "@angular/core";
@Injectable({
    providedIn: 'root'
})
export class DateFormatterService {
    constructor() { }
    ConvertLocalDateTimeString(dateTime: Date): string {
        if (dateTime instanceof Date && !isNaN(dateTime.getTime())) {
            var curr = formatDate(dateTime, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", "en-US", "India Standard Time");
            return curr.toString();
        } else {
            console.error("Invalid Date: ", dateTime);
            return "";
        }
    }
    ConvertLocalDateString(dateTime: Date) {
        var curr = formatDate(dateTime, "yyyy-MM-dd'T'00:00:00.000'Z'", "en-US", "India Standard Time");
        return curr.toString();
    }
    ConvertLocalTimeString(dateTime: Date) {
        if (dateTime) {
            var curr = formatDate(dateTime, "HH:mm:ss", "en-US", "India Standard Time");
            return curr.toString();
        }
        else {
            return null;
        }
    }

    ConvertLocalDateStringOnlyDate(dateTime: Date) {
        const day = dateTime.getDate().toString().padStart(2, '0');
        //const month = (dateTime.getMonth() + 1).toString().padStart(2, '0');
        const month = dateTime.toLocaleString([], { month: 'short' });
        const year = dateTime.getFullYear();

        return day + '-' + month + '-' + year;
    }

    ConvertToIST(dateTime: Date): Date {
        if (dateTime instanceof Date && !isNaN(dateTime.getTime())) {
            const istDate = new Date(dateTime);
            istDate.setMinutes(istDate.getMinutes() + 330);
            return istDate;
        } else {
            console.error("Invalid Date: ", dateTime);
            return new Date();
        }
    }

    formatDate(dateString: string): string {
        if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
            const [year, month, day] = dateString.split('-');
            const formattedDay = day.padStart(2, '0');
            const formattedMonth = month.padStart(2, '0');
            return `${formattedDay}-${formattedMonth}-${year}`;
        }
        return dateString;
    }

    //Use this in most of the places where we need to convert date to string in IST timezone, this will handle the DST as well
    ConvertDateToISTStartOfDayString(dateInput: Date | string): string {
        const date = new Date(dateInput);

        if (!(date instanceof Date) || isNaN(date.getTime())) {
            console.error("Invalid Date: ", dateInput);
            return "";
        }

        date.setHours(5, 30, 0, 0);

        return this.ConvertLocalDateTimeString(date);
    }

}