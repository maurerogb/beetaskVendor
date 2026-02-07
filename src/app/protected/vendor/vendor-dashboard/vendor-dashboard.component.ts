import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MenuItem } from 'primeng/api';
import { InputTextModule } from 'primeng/inputtext';
import { SplitButton } from "primeng/splitbutton";
import { Button } from "primeng/button";
import { VendorStartisticCompnent } from './components/statistics.component';
import { TableModule } from 'primeng/table';
import { AccountService } from 'src/core/services/account.service';
import { VendorService } from 'src/core/services/vendor.service';
import { OrderService } from 'src/core/services/order.service';
import { formatDate } from 'src/utils/date-utils';
import { Router } from '@angular/router';
import { CustomerOrder, OrderStatus } from '@/types/order';
import { CommonModule } from '@angular/common';
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";

@Component({
    selector: 'app-vendor-dashboard',
    imports: [InputTextModule, FormsModule, SplitButton, Button, VendorStartisticCompnent, TableModule, CommonModule, DateFilterComponent],
    templateUrl: './vendor-dashboard.component.html',
    styleUrl: './vendor-dashboard.component.scss'
})
export class VendorDashboardComponent {

    vendorService = inject(VendorService)
    orderService = inject(OrderService)
    accountService = inject(AccountService)
    currentVendor = signal<any>({})
    customerOrder = signal<CustomerOrder[]>([])
    hasDisplayPicture = signal<boolean>(true);
    router = inject(Router)

    items: MenuItem[] = [
        {
            label: 'Online',
            icon: 'pi pi-check'
        },
        {
            label: 'Offline',
            icon: 'pi pi-upload'
        },
    ]
    constructor() {
        console.log('dashboard');
        this.accountService.getcurrentUser()
        const user = this.accountService.currentUser();
        console.log(user?.data.uuId);
        // this.getAllOrders()
        this.vendorService.getVendorInfo();
        if (this.vendorService.vendorinfo().length == 0) {
            this.vendorService.getVendor(user?.data.uuId).subscribe({
                next: res => {
                    let result = res.data
                    this.currentVendor.set(result)
                    const data = JSON.stringify(result)
                    //console.log('result', res);
                    // if(result.displayPicture.length){
                    //     this.hasDisplayPicture.set(true)
                    // }
                    localStorage.setItem('vendor-details', data)
                    this.getRecentOrders()
                }
            })
        }
        this.getRecentOrders()
    }

    gotoMenuManager() {
        this.router.navigate(["/vendorside/menu-management"])
    }

    completeRegistration() {
        this.router.navigate(["/vendorside/settings/vendor-profile"])
    }
    getAllOrders() {
        this.orderService.getAllOrder().subscribe(res => {
            console.log(res);

        })
    }
    getRecentOrders() {
        let date = new Date()
        console.log(this.vendorService.vendorinfo());

        if (this.vendorService.vendorinfo().length > 0) {
            const vendor = this.vendorService.vendorinfo()[0];

            this.orderService.getOrders(vendor.vendorId, formatDate(date)).subscribe({
                next: res => {
                    // let result = res.data[0]

                    console.log('result', res);
                    this.customerOrder.set(res.data)

                }
            })
        }
    }

    getOrderStatus(id: number): any {
        return OrderStatus[id] !== undefined ? OrderStatus[id] : OrderStatus.Pending;  // Default to 'Viewer' if ID is invalid
    }


}
