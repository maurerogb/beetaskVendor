import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
    selector: '[phone-format]',
    standalone: true
})
export class PhoneAutoFormatDirective {


    /** Default country code */
    @Input() countryCode = '234';
    @Input() minDigits = 11;
    @Input() maxDigits = 15;

    constructor(
        private el: ElementRef<HTMLInputElement>,
        private renderer: Renderer2
    ) { }

    @HostListener('input', ['$event'])
    onInput(event: InputEvent) {
        const input = this.el.nativeElement;

        const rawValue = input.value;
        const cursorPos = input.selectionStart ?? rawValue.length;

        // Keep only digits and +
        let digits = rawValue.replace(/[^\d+]/g, '');

        // Normalize
        if (digits.startsWith('+')) {
            digits = digits.substring(1);
        }

        // Ensure country code
        if (!digits.startsWith(this.countryCode)) {
            digits = this.countryCode + digits.replace(/^0+/, '');
        }

        // Remove country code for grouping
        const local = digits.substring(this.countryCode.length);

        // Grouping: 3-3-4 (adjustable)
        const formatted =
            `+${this.countryCode} ` +
            local
                .replace(/\D/g, '')
                .replace(/(\d{3})(\d{3})(\d{0,4})/, (_, a, b, c) =>
                    [a, b, c].filter(Boolean).join(' ')
                )
                .trim();

        // Update value
        this.renderer.setProperty(input, 'value', formatted);

        // Restore cursor
        const newPos = Math.min(formatted.length, cursorPos + 1);
        input.setSelectionRange(newPos, newPos);
    }
}
