import { Component, inject } from '@angular/core';
import { DropdownModule } from "primeng/dropdown";
import { ToggleSwitch } from "primeng/toggleswitch";
import { VendorService } from 'src/core/services/vendor.service';

@Component({
    selector: 'app-restaurant-location',
    imports: [DropdownModule, ToggleSwitch],
    templateUrl: './restaurant-location.component.html',
    styleUrl: './restaurant-location.component.scss'
})
export class RestaurantLocationComponent {

    vendorService = inject(VendorService)
    // accountService = inject(AccountService)

    constructor() {
        this.getBusinessData();


    }

    getBusinessData() {
        this.vendorService.getVendorInfo();
        const vendorDetails = this.vendorService.vendorinfo();
        console.log('vendorDetails', vendorDetails);
    }
}
