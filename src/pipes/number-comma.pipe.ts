import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'numberComma'
})
export class NumberCommaPipe implements PipeTransform {

    transform(value: number | string | null | undefined): string {
        if (value === null || value === undefined || value === '') {
            return '';
        }

        const num = Number(value.toString().replace(/,/g, ''));

        if (isNaN(num)) {
            return '';
        }

        return num.toLocaleString('en-US');
    }

}
