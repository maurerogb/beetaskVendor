import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'trimWords'
})
export class TrimWordsPipe implements PipeTransform {

    transform(value: string, limit: number = 10): string {
        if (!value) return '';

        const words = value.split(/\s+/); // split by spaces
        if (words.length <= limit) {
            return value; // no trimming needed
        }

        return words.slice(0, limit).join(' ') + '...';
    }

}
