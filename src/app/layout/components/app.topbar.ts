import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '@/layout/service/layout.service';
import { Ripple } from 'primeng/ripple';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { MegaMenuModule } from 'primeng/megamenu';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadge } from 'primeng/overlaybadge';
import { LogoComponent } from "@/public/component/logo/logo.component";
import { SvgIconComponent } from "@/components/svg-icon/svg-icon.component";
import { BellComponent } from "@/components/bell";
import { NotificationBellComponent } from "@/components/notification-bell";
import { AccountService } from 'src/core/services/account.service';
import { UserComponent } from "@/components/user";

@Component({
    selector: '[app-topbar]',
    standalone: true,
    imports: [RouterModule, CommonModule, StyleClassModule, FormsModule, ButtonModule, MegaMenuModule, BadgeModule, LogoComponent, NotificationBellComponent, UserComponent],
    template: `
        <div class="layout-topbar-start">
            <a class="layout-topbar-logo" routerLink="/">
            <app-logo></app-logo>
            </a>
            <a #menuButton class="layout-menu-button " (click)="onMenuButtonClick()">
                <i class="pi pi-chevron-right "></i>
            </a>

            <!-- <button class="app-config-button app-config-mobile-button" (click)="toggleConfigSidebar()">
                <i class="pi pi-cog"></i>
            </button> -->

            <a #mobileMenuButton class="layout-topbar-mobile-button" (click)="onTopbarMenuToggle()">
                <i class="pi pi-ellipsis-v bg-p"></i>
            </a>
        </div>

        <div class="layout-topbar-end">
            <div class="text-[#1F0702] text-2xl font-bold">Admin</div>
            <div class="flex items-center flex-row gap-3">
                <div class="bg-white p-3">
                    <app-bell></app-bell>
                </div>
                <div class="flex flex-row">
                    <!-- <img [src]="" alt=""> -->
                    <div class="rounded-full">
                    <app-user-icon ></app-user-icon>

                    </div>
                    <div class="flex flex-col ml-3 ">
                        <span class="text-[#1F0702] text-lg font-semibold"> Beetask Admin</span>
                        <span  class="text-[#7C797A] text-sm font-medium">{{this.accountService.currentUser()?.data?.fullName}}</span>
                    </div>
                    <div class="flex items-center m-2">
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M6.66658 7.5001C3.94492 7.5001 0.732416 2.3001 0.116583 1.2576C-0.118417 0.861766 0.0132493 0.350932 0.409083 0.116766C0.805749 -0.119068 1.31658 0.0142655 1.54992 0.409266C2.84575 2.59677 5.36658 5.83343 6.66658 5.83343C7.96825 5.83343 10.4891 2.59677 11.7832 0.409266C12.0174 0.0142655 12.5299 -0.119068 12.9241 0.116766C13.3199 0.350099 13.4516 0.860932 13.2166 1.2576C12.6008 2.3001 9.38825 7.5001 6.66658 7.5001Z" fill="#5B5858"/>
                        </svg>

                    </div>
                </div>
            </div>

        </div>
    `,
    host: {
        class: 'layout-topbar'
    },
    styles: `
        :host ::ng-deep .p-overlaybadge .p-badge {
            outline-width: 0px;
        }
    `
})
export class AppTopbar {
    layoutService = inject(LayoutService);
    accountService = inject(AccountService)

    @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

    @ViewChild('menuButton') menuButton!: ElementRef<HTMLButtonElement>;

    @ViewChild('mobileMenuButton') mobileMenuButton!: ElementRef<HTMLButtonElement>;

    model: MegaMenuItem[] = [
        {
            label: 'UI KIT',
            items: [
                [
                    {
                        label: 'UI KIT 1',
                        items: [
                            { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', to: '/uikit/formlayout' },
                            { label: 'Input', icon: 'pi pi-fw pi-check-square', to: '/uikit/input' },
                            { label: 'Float Label', icon: 'pi pi-fw pi-bookmark', to: '/uikit/floatlabel' },
                            { label: 'Button', icon: 'pi pi-fw pi-mobile', to: '/uikit/button' },
                            { label: 'File', icon: 'pi pi-fw pi-file', to: '/uikit/file' }
                        ]
                    }
                ],
                [
                    {
                        label: 'UI KIT 2',
                        items: [
                            { label: 'Table', icon: 'pi pi-fw pi-table', to: '/uikit/table' },
                            { label: 'List', icon: 'pi pi-fw pi-list', to: '/uikit/list' },
                            { label: 'Tree', icon: 'pi pi-fw pi-share-alt', to: '/uikit/tree' },
                            { label: 'Panel', icon: 'pi pi-fw pi-tablet', to: '/uikit/panel' },
                            { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', to: '/uikit/charts' }
                        ]
                    }
                ],
                [
                    {
                        label: 'UI KIT 3',
                        items: [
                            { label: 'Overlay', icon: 'pi pi-fw pi-clone', to: '/uikit/overlay' },
                            { label: 'Media', icon: 'pi pi-fw pi-image', to: '/uikit/media' },
                            { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/uikit/menu' },
                            { label: 'Message', icon: 'pi pi-fw pi-comment', to: '/uikit/message' },
                            { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/uikit/misc' }
                        ]
                    }
                ]
            ]
        },
        {
            label: 'UTILITIES',
            items: [
                [
                    {
                        label: 'UTILITIES 1',
                        items: [
                            {
                                label: 'Buy Now',
                                icon: 'pi pi-fw pi-shopping-cart',
                                url: 'https://www.primefaces.org/store',
                                target: '_blank'
                            },
                            {
                                label: 'Documentation',
                                icon: 'pi pi-fw pi-info-circle',
                                to: '/documentation'
                            }
                        ]
                    }
                ]
            ]
        }
    ];

    onMenuButtonClick() {
        this.layoutService.onMenuToggle();
    }

    onRightMenuButtonClick() {

        this.layoutService.openRightMenu();
    }

    toggleConfigSidebar() {
        let layoutState = this.layoutService.layoutState();

        if (this.layoutService.isSidebarActive()) {
            layoutState.overlayMenuActive = false;
            layoutState.overlaySubmenuActive = false;
            layoutState.staticMenuMobileActive = false;
            layoutState.menuHoverActive = false;
            layoutState.configSidebarVisible = false;
        }
        layoutState.configSidebarVisible = !layoutState.configSidebarVisible;
        this.layoutService.layoutState.set({ ...layoutState });
    }

    focusSearchInput() {
        setTimeout(() => {
            this.searchInput.nativeElement.focus();
        }, 150);
    }

    onTopbarMenuToggle() {
        this.layoutService.layoutState.update((val) => ({ ...val, topbarMenuActive: !val.topbarMenuActive }));
    }
}
