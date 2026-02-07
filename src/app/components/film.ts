
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-film',
    imports: [CommonModule],
    template:`
<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="2" y="2" width="32" height="32" rx="16" fill="#EBD3CE"/>
<rect x="2" y="2" width="32" height="32" rx="16" stroke="#FCF8F8" stroke-width="4"/>
<g clip-path="url(#clip0_2573_3598)">
<path d="M14.6666 11.334V24.6673M21.3333 11.334V24.6673M11.3333 18.0007H24.6666M11.3333 14.6673H14.6666M11.3333 21.334H14.6666M21.3333 21.334H24.6666M21.3333 14.6673H24.6666M12.7866 11.334H23.2133C24.0159 11.334 24.6666 11.9847 24.6666 12.7873V23.214C24.6666 24.0166 24.0159 24.6673 23.2133 24.6673H12.7866C11.9839 24.6673 11.3333 24.0166 11.3333 23.214V12.7873C11.3333 11.9847 11.9839 11.334 12.7866 11.334Z" stroke="#801E08" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
</g>
<defs>
<clipPath id="clip0_2573_3598">
<rect width="16" height="16" fill="white" transform="translate(10 10)"/>
</clipPath>
</defs>
</svg>
`,

})
export class FilmComponent {

}
