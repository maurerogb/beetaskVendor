import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-vendor-setting',
    imports: [NgClass, RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './vendor-setting.component.html',
    styleUrl: './vendor-setting.component.scss'
})
export class VendorSettingComponent {


    menuItems = [
        { key: 'vendor-profile', label: 'Account/Profile' },
        { key: 'business-time', label: 'Business Hours' },
        { key: 'location', label: 'Restaurant Location' },
        { key: 'notifications', label: 'Notification Preferences' },
        { key: 'account-security', label: 'Account Security' },
        { key: 'order-deal', label: 'Order & Deal Settings' },
    ];

    active = 'account'; // default active item

}
