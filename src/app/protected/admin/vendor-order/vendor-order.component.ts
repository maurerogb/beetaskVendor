import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from "primeng/table";
import { AccountService } from 'src/core/services/account.service';
import { OrderService } from 'src/core/services/order.service';
import { formatDate } from 'src/utils/date-utils';
import { OrdinalDatePipe } from "../../../../pipes/ordinal-date.pipe";
import { DatePicker } from "primeng/datepicker";
import { VendorService } from 'src/core/services/vendor.service';
import { CustomerOrder, OrderData, OrderStatus, OrderSummary } from '@/types/order';
import { CommonModule } from '@angular/common';
import { Dialog } from "primeng/dialog";
import { ButtonModule } from 'primeng/button';
import { Tag } from "primeng/tag";
import { NumberCommaPipe } from "../../../../pipes/number-comma.pipe";
@Component({
    selector: 'app-vendor-order',
    imports: [TableModule, OrdinalDatePipe, DatePicker, ButtonModule, CommonModule, Dialog, NumberCommaPipe],
    templateUrl: './vendor-order.component.html',
    styleUrl: './vendor-order.component.scss'
})
export class VendorOrderComponent implements OnInit {

    pageNo = signal<number>( 1);
    pageSize = signal<number>(10);
    orderService = inject(OrderService)
    accountService = inject(AccountService)
    productDialog: boolean = false;
    constructor() { this.today = new Date() }
    vendorService = inject(VendorService)
    customerOrder = signal<OrderData | null>(null);
    showDatepicker: boolean = true;
    selectedOrder = signal<OrderSummary | null>(null);
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
    openDetails(order: OrderSummary) {
        this.selectedOrder.set(order);
        this.productDialog   = true;
        console.log(order);



    }
    getRecentOrders() {



            this.orderService.getAllOrders(this.pageNo(), this.pageSize()).subscribe({
                next: (res: any) => {
                    // let result = res.data[0]

                    console.log('result', res.data);
                    this.customerOrder.set(res.data)

                }
            })

    }

    getOrderStatus(id: number): any {
        return OrderStatus[id] !== undefined ? OrderStatus[id] : OrderStatus.Pending;  // Default to 'Viewer' if ID is invalid
    }

}
