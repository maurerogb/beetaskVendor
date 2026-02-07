
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from 'src/core/services/loader.service';

@Component({
    selector: 'app-lock-icon',
    imports: [CommonModule],
    template: `
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.8507 3.99125C10.4687 2.72792 9.28741 1.81592 7.90208 1.83325C6.25741 1.85325 4.92741 3.17792 4.89941 4.82258V6.26858" stroke="#302D2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M7.93978 9.4375V10.9182" stroke="#302D2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.94016 5.88281C4.11016 5.88281 2.8335 6.92815 2.8335 10.0635C2.8335 13.1995 4.11016 14.2448 7.94016 14.2448C11.7708 14.2448 13.0475 13.1995 13.0475 10.0635C13.0475 6.92815 11.7708 5.88281 7.94016 5.88281Z" stroke="#302D2E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
})
export class LockComponent {
    constructor(public loaderService: LoaderService) { }
}
