import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'maskNumber'
})
export class MaskNumberPipe implements PipeTransform {

    transform(value: string | number, maskLength: number = 6): string {
        if (!value) return '';

        const strValue = value.toString();

        // Only mask if length is >= maskLength
        if (strValue.length <= maskLength) {
            return '*'.repeat(strValue.length);
        }

        const visiblePart = strValue.slice(maskLength);
        const maskedPart = '*'.repeat(maskLength);

        return maskedPart + visiblePart;
    }

}
