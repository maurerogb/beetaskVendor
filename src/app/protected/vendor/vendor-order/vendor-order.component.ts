import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from "primeng/table";
import { AccountService } from 'src/core/services/account.service';
import { OrderService } from 'src/core/services/order.service';
import { formatDate } from 'src/utils/date-utils';
import { OrdinalDatePipe } from "../../../../pipes/ordinal-date.pipe";
import { DatePicker } from "primeng/datepicker";
import { VendorService } from 'src/core/services/vendor.service';
import { CustomerOrder, OrderStatus } from '@/types/order';
import { CommonModule } from '@angular/common';
import { Dialog } from "primeng/dialog";
import { Product } from '@/types/product';
import { ButtonModule } from 'primeng/button';
import { Tag } from "primeng/tag";
@Component({
    selector: 'app-vendor-order',
    imports: [TableModule, OrdinalDatePipe, DatePicker, ButtonModule, CommonModule, Dialog, Tag],
    templateUrl: './vendor-order.component.html',
    styleUrl: './vendor-order.component.scss'
})
export class VendorOrderComponent implements OnInit {


    orderService = inject(OrderService)
    accountService = inject(AccountService)
    productDialog: boolean = false;
    constructor() { this.today = new Date() }
    vendorService = inject(VendorService)
    customerOrder = signal<CustomerOrder[]>([])
    showDatepicker: boolean = true;
    today: any
    ngOnInit(): void {
        this.getRecentOrders()

    }
    selectedDate(evt: any) {
        console.log(evt);
        this.today = evt
        this.showDatepicker = true
        this.accountService.getcurrentUser()
        this.getRecentOrders()
    }
    changeControl() {
        this.showDatepicker = this.showDatepicker == true ? false : true
        console.log(this.showDatepicker);

    }
    openDetails(product: CustomerOrder) {
        this.productDialog = true;
        console.log(product);

    }
    getRecentOrders() {

        console.log(this.vendorService.vendorinfo());
        this.vendorService.getVendorInfo();
        if (this.vendorService.vendorinfo().length > 0) {
            const vendor = this.vendorService.vendorinfo()[0];

            this.orderService.getOrders(vendor.vendorId, formatDate(this.today)).subscribe({
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
