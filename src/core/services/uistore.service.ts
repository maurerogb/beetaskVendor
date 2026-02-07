import { Injectable, signal } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UiStore {
    // mobile sidebar state
    readonly sidebarOpen = signal(false);

    openSidebar() { this.sidebarOpen.set(true); }
    closeSidebar() { this.sidebarOpen.set(false); }
    toggleSidebar() { this.sidebarOpen.update(v => !v); }
}


