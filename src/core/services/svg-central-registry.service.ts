import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class IconCentralRegistry {
    private readonly icons: { [key: string]: string } = {};

    constructor() {
        this.registerIcons({
            star: `
            <svg viewBox="0 0 24 24">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
        `,
            heart: `
            <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
        `,
            user: `
            <svg viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
        `,
        search:`
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2753 2.71484C16.0029 2.71484 19.8363 6.54722 19.8363 11.2758C19.8363 16.0044 16.0029 19.8367 11.2753 19.8367C6.54674 19.8367 2.71436 16.0044 2.71436 11.2758C2.71436 6.54722 6.54674 2.71484 11.2753 2.71484Z" stroke="#7C797A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8987 18.4883C20.6778 18.4883 21.3092 19.1207 21.3092 19.8988C21.3092 20.6788 20.6778 21.3102 19.8987 21.3102C19.1197 21.3102 18.4873 20.6788 18.4873 19.8988C18.4873 19.1207 19.1197 18.4883 19.8987 18.4883Z" stroke="#7C797A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `,
        foursquare:`
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0003 6.98825C21.0003 9.01685 19.3551 10.6621 17.3265 10.6621C15.2979 10.6621 13.6536 9.01685 13.6536 6.98825C13.6536 4.95965 15.2979 3.31445 17.3265 3.31445C19.3551 3.31445 21.0003 4.95965 21.0003 6.98825Z" stroke="#992409" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3467 6.98825C10.3467 9.01685 8.7024 10.6621 6.6729 10.6621C4.6452 10.6621 3 9.01685 3 6.98825C3 4.95965 4.6452 3.31445 6.6729 3.31445C8.7024 3.31445 10.3467 4.95965 10.3467 6.98825Z" stroke="#992409" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0003 17.5761C21.0003 19.6047 19.3551 21.249 17.3265 21.249C15.2979 21.249 13.6536 19.6047 13.6536 17.5761C13.6536 15.5475 15.2979 13.9023 17.3265 13.9023C19.3551 13.9023 21.0003 15.5475 21.0003 17.5761Z" stroke="#992409" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3467 17.5761C10.3467 19.6047 8.7024 21.249 6.6729 21.249C4.6452 21.249 3 19.6047 3 17.5761C3 15.5475 4.6452 13.9023 6.6729 13.9023C8.7024 13.9023 10.3467 15.5475 10.3467 17.5761Z" stroke="#992409" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        `
        });
    }

    registerIcons(icons: { [key: string]: string }): void {
        Object.assign(this.icons, icons);
    }

    getIcon(name: string): string | undefined {
        return this.icons[name];
    }
}
