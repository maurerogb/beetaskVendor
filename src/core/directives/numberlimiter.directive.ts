import {
    Directive,
    ElementRef,
    HostListener,
    Input
} from '@angular/core';

@Directive({
    selector: '[digitLimit]',
    standalone: true
})
export class NumberlimiterDirective {

    @Input() maxDigits!: number;
    @Input() allowDecimal = false;

    constructor(private readonly el: ElementRef<HTMLInputElement>) { }

    @HostListener('input', ['$event'])
    onInput(event: Event): void {
        const input = this.el.nativeElement;
        const original = input.value;

        let value = original;


        value = this.allowDecimal
            ? value.replace(/[^0-9.]/g, '')
            : value.replace(/\D/g, '');

        if (this.allowDecimal) {
            const parts = value.split('.');
            if (parts.length > 2) {
                value = parts[0] + '.' + parts.slice(1).join('');
            }
        }

        const digits = value.replace(/\D/g, '');
        if (this.maxDigits && digits.length > this.maxDigits) {
            let count = 0;
            value = value
                .split('')
                .filter(char => {
                    if (/\d/.test(char)) {
                        count++;
                        return count <= this.maxDigits;
                    }
                    return this.allowDecimal && char === '.';
                })
                .join('');
        }

        if (value !== original) {
            input.value = value;
        }
    }

    @HostListener('paste', ['$event'])
    onPaste(event: ClipboardEvent): void {
        event.preventDefault();
        const pasted = event.clipboardData?.getData('text') ?? '';
        this.el.nativeElement.value = pasted;
        this.onInput(event);
    }
}
