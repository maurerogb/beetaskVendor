import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu, [app-menu]',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: ` <ul class="layout-menu" #menuContainer>
        <ng-container *ngFor="let item of model; let i = index">
            <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
            <li *ngIf="item.separator" class="menu-separator"></li>
        </ng-container>
    </ul>`
})
export class AppMenu {
    el: ElementRef = inject(ElementRef);

    @ViewChild('menuContainer') menuContainer!: ElementRef;

    model: MenuItem[] = [
        {
            items: [
                {
                    label: ' Dashboard',
                    icon: 'pi ci-fw ci-foursquare',
                    routerLink: ['/admin/dashboard']
                },
                {
                    label: 'Orders',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/vendorside/orders']
                },

                {
                    label: 'Users Mgt',
                    icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Riders',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/']
                        },
                        {
                            label: 'Vendors',
                            icon: 'pi pi-fw pi-chart-pie',
                            routerLink: ['/dashboard-analytics']
                        },
                        {
                            label: 'User',
                            icon: 'pi pi-fw pi-bolt',
                            routerLink: ['/dashboard-saas']
                        },
                    ]
                },

                {
                    label: 'Finance',
                    icon: 'pi pi-home',
                    items: [
                        {
                            label: 'Rider Earnings',
                            icon: 'pi pi-fw pi-home',
                            routerLink: ['/']
                        },
                        {
                            label: 'Vendor Earnings',
                            icon: 'pi pi-fw pi-chart-pie',
                            routerLink: ['/dashboard-analytics']
                        },
                        {
                            label: 'Payouts',
                            icon: 'pi pi-fw pi-bolt',
                            routerLink: ['/dashboard-saas']
                        },
                         {
                            label: 'Refund Logs',
                            icon: 'pi pi-fw pi-bolt',
                            routerLink: ['/dashboard-saas']
                        },
                    ]
                },
                {
                    label: 'Verifications',
                    icon: 'pi pi-fw pi-users',
                    routerLink: ['/vendorside/earnings']
                },

            ]
        },

        {
            label: 'Activity',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Notifications',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/vendor/onboarding/login']
                },
                {
                    label: 'Report',
                    icon: 'pi pi-fw pi-bolt',
                    routerLink: ['/vendorside/report']
                },  {
                    label: 'Tools',
                    icon: 'pi pi-fw pi-bolt',
                    routerLink: ['/vendorside/report']
                },

            ]
        },
        {
            label: 'Others',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-chart-pie',
                    routerLink: ['/vendorside/settings']
                },
                {
                    label: 'Support',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/vendor/onboarding/login']
                },
                // {
                //     label: 'Logout',
                //     icon: 'pi pi-fw pi-home',
                //     routerLink: ['/vendor/onboarding/login']
                // }
            ]
        }

    ];
}
