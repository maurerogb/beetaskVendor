import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ordinalDate'
})
export class OrdinalDatePipe implements PipeTransform {
    transform(value: Date | string): string {
        if (!value) return '';

        const date = new Date(value);
        const day = date.getDate();
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();

        return `${day}${this.getOrdinal(day)} ${month}, ${year}`;
    }

    private getOrdinal(day: number): string {
        if (day > 3 && day < 21) return 'th'; // 4-20 are always 'th'
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
}
