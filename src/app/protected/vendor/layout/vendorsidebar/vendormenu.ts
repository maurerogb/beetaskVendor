import { AppMenuitem } from "@/layout/components/app.menuitem";
import { CommonModule } from "@angular/common";
import { Component, ElementRef, inject, ViewChild } from "@angular/core";
import { RouterModule } from "@angular/router";
import { MenuItem } from "primeng/api";


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
                    routerLink: ['/dashboards/analytics']
                },
                {
                    label: 'Orders',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/dashboards/sales']
                },
                {
                    label: 'Menu Management',
                    icon: 'pi pi-fw pi-bolt',
                    routerLink: ['/dashboards/saas']
                },
                {
                    label: 'Earnings',
                    icon: 'pi pi-fw pi-bolt',
                    routerLink: ['/dashboards/saas']
                },
                {
                    label: 'Report',
                    icon: 'pi pi-fw pi-bolt',
                    routerLink: ['/dashboards/saas']
                }
            ]
        },

        {
            label: 'Others',
            icon: 'pi pi-home',
            items: [
                {
                    label: 'Settings',
                    icon: 'pi pi-fw pi-chart-pie',
                    routerLink: ['/dashboards/analytics']
                },
                {
                    label: 'Logout',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/dashboards/sales']
                }
            ]
        }

    ];
}
