import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneNg',
    standalone: true
})
export class PhoneFormaterPipe implements PipeTransform {



    transform(
        value: string | number | null | undefined,
        countryCode: string = '234'
    ): string {
        if (!value) return '';

        // Convert to string and keep digits only
        let digits = value.toString().replace(/[^\d]/g, '');

        // Ensure country code
        if (!digits.startsWith(countryCode)) {
            digits = countryCode + digits.replace(/^0+/, '');
        }

        const local = digits.slice(countryCode.length);

        // Group local number: 3-3-4 (customizable)
        const formattedLocal = local.replace(
            /(\d{3})(\d{3})(\d{0,4})/,
            (_, a, b, c) => [a, b, c].filter(Boolean).join(' ')
        );

        return `+${countryCode} ${formattedLocal}`.trim();

    }
}
