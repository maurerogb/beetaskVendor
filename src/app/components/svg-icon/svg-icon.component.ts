import { NgStyle } from '@angular/common';
import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SvgIconRegistryService } from 'src/core/services/svg-icon-registry.service';

@Component({
    selector: '.ci',
    imports: [NgStyle],
    template: `
    <ng-content></ng-content>
    <svg *ngIf="svgContent" [innerHTML]="svgContent" [ngStyle]="styles"></svg>
    `,
    styles: [`
        :host {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        }
        svg {
        width: 1em;
        height: 1em;
        }
        :host(.pi-fw) {
        width: 1.25em;
        }
    `]
})
export class SvgIconComponent implements OnInit {
    @Input() name: string = '';
    @Input() size: string | number = 24;
    @Input() color: string = 'currentColor';
    @Input() class: string = '';

    svgContent: SafeHtml | null = null;
    styles: { [key: string]: string | number } = {};

    constructor(
        private readonly iconRegistry: SvgIconRegistryService,
        private readonly sanitizer: DomSanitizer,
        private readonly el: ElementRef
    ) { }

    ngOnInit(): void {
        this.parseClasses();
        this.updateIcon();
    }


    private parseClasses(): void {
    const classes = this.el.nativeElement.className.split(' ') as string[];
        const iconClass = classes.find((cls: string) => cls.startsWith('ci-') && cls !== 'ci' && cls !== 'ci-fw');
        if (iconClass) {
            this.name = iconClass.replace('ci-', '');
        }
        if (classes.includes('ci-fw')) {
            this.size = '1.25em'; // Fixed width adjustment
        }
    }

    private updateIcon(): void {
        console.log(this.name)
        const icon = this.iconRegistry.getIcon(this.name);
        if (icon) {
            this.svgContent = this.sanitizer.bypassSecurityTrustHtml(icon);
            this.styles = {
                width: typeof this.size === 'number' ? `${this.size}px` : this.size,
                height: typeof this.size === 'number' ? `${this.size}px` : this.size,
                fill: this.color,
                display: 'inline-flex'
            };
        } else {
            console.warn(`Icon '${this.name}' not found in registry`);
        }
    }
}
