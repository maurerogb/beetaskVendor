import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { UiStore } from 'src/core/services/uistore.service';
import { LogoComponent } from "@/public/component/logo/logo.component";
import { NgFor, NgClass } from '@angular/common';

@Component({
    selector: 'app-vendorsidebar',
    imports: [RouterLink, RouterLinkActive, LogoComponent],
    templateUrl: './vendorsidebar.component.html',
    styleUrl: './vendorsidebar.component.scss'
})
export class VendorsidebarComponent {
  constructor(public ui: UiStore) {}

  menu = [
    // { label: 'Dashboard',active:'true', path: '/dashboard', icon: '🏠' },
    { label: 'Orders',active:'false',  path: '/orders', icon: '📦' },
    { label: 'Menu Management',active:'false', path: '/menu', icon: '📋' },
    { label: 'Earnings',active:'false', path: '/earnings', icon: '💰' },
    { label: 'Report',active:'false', path: '/report', icon: '📊' },
    { label: 'Settings',active:'false', path: '/settings', icon: '⚙️' },
    { label: 'Logout',active:'false', path: '/logout', icon: '🚪' },
  ];
}


