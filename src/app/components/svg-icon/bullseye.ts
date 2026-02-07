import { Component, Input } from '@angular/core';

@Component({
    selector: 'bt-bulls-eye',
    imports: [],
    template: `
     <svg width="36" height="36" viewBox="0 0 56 56" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <rect x="4" y="4" width="48" height="48" rx="24" fill="#FEF0D8" />
                                    <rect x="4" y="4" width="48" height="48" rx="24" stroke="#FCC05B"
                                        stroke-width="8" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M30.5078 26.7105C30.5078 25.3292 29.3886 24.21 28.0073 24.21C26.627 24.21 25.5078 25.3292 25.5078 26.7105C25.5078 28.0907 26.627 29.21 28.0073 29.21C29.3886 29.21 30.5078 28.0907 30.5078 26.7105Z"
                                        stroke="#992409" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M27.9995 37C25.1015 37 20.5 31.9587 20.5 26.5986C20.5 22.4025 23.8571 19 27.9995 19C32.1419 19 35.5 22.4025 35.5 26.5986C35.5 31.9587 30.8985 37 27.9995 37Z"
                                        stroke="#992409" stroke-width="1.5" stroke-linecap="round"
                                        stroke-linejoin="round" />
                                </svg>
    
    `       

})
export class BullsEyeComponent {
}