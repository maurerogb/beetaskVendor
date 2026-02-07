import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-sort',
    imports: [CommonModule],
    template: `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5.81559 3.83398V14.349" stroke="#414651" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M2.4165 7.2487C2.4165 7.2487 4.224 3.83203 5.81484 3.83203C7.40484 3.83203 9.21317 7.2487 9.21317 7.2487" stroke="#414651" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M14.0881 16.1888V5.67383" stroke="#414651" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17.4876 12.7734C17.4876 12.7734 15.6793 16.1901 14.0893 16.1901C12.4993 16.1901 10.6909 12.7734 10.6909 12.7734" stroke="#414651" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`})
export class SortComponent {
}
