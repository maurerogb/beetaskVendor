import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from 'src/core/services/loader.service';

@Component({
    selector: 'app-filter',
    imports: [CommonModule],
    template: `<div class="border bg-white shadow-md p-2  rounded-md ">
        <i class="pi mx-1">
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33594 5.83496H13.3359M0.835938 0.834961H15.8359M5.83594 10.835H10.8359" stroke="#344054" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </i>

        Filters</div>
    `,

})
export class FilterComponent {
    constructor(public loaderService: LoaderService) { }
}


@Component({
    selector: 'app-filter-svg',
    imports: [CommonModule],
    template: `
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.33594 5.83496H13.3359M0.835938 0.834961H15.8359M5.83594 10.835H10.8359" stroke="#344054" stroke-width="1.67" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `,

})
export class Filter {
    constructor(public loaderService: LoaderService) { }
}
