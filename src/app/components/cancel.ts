

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-cancel',
    imports: [CommonModule],
    template:`
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.3941 9.82031L9.60205 14.7257" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M14.4001 14.7339L9.6001 9.82031" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.75 12.2833C2.75 19.3845 5.063 21.7522 12 21.7522C18.937 21.7522 21.25 19.3845 21.25 12.2833C21.25 5.18218 18.937 2.81445 12 2.81445C5.063 2.81445 2.75 5.18218 2.75 12.2833Z" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            `,
})
export class CancelComponent {

}
