import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
    selector: '[format]'
})
export class NumberCommaDirective {

    private el: HTMLInputElement;

    constructor(private elementRef: ElementRef) {
        this.el = this.elementRef.nativeElement;
    }

    @HostListener('input', ['$event'])
    onInput(event: Event) {
        const value = this.el.value.replace(/,/g, '');

        if (!value || isNaN(Number(value))) {
            this.el.value = '';
            return;
        }

        this.el.value = this.formatNumber(value);
    }

    private formatNumber(value: string): string {
        return Number(value).toLocaleString('en-US');
    }

}
