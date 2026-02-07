

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from 'src/core/services/loader.service';

@Component({
    selector: 'app-note',
    imports: [CommonModule],
    template: `<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2" y="2" width="32" height="32" rx="16" fill="#EBD3CE"/>
<rect x="2" y="2" width="32" height="32" rx="16" stroke="#FCF8F8" stroke-width="4"/>
<path d="M18.6667 11.334H14.0001C13.6465 11.334 13.3073 11.4745 13.0573 11.7245C12.8072 11.9746 12.6667 12.3137 12.6667 12.6673V23.334C12.6667 23.6876 12.8072 24.0267 13.0573 24.2768C13.3073 24.5268 13.6465 24.6673 14.0001 24.6673H22.0001C22.3537 24.6673 22.6928 24.5268 22.9429 24.2768C23.1929 24.0267 23.3334 23.6876 23.3334 23.334V16.0007M18.6667 11.334L23.3334 16.0007M18.6667 11.334V16.0007H23.3334" stroke="#801E08" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
`,

})
export class NoteComponent {
    constructor(public loaderService: LoaderService) { }
}
