import { Component, inject, signal } from '@angular/core';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { FilterComponent, Filter } from "@/components/filter";
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from "primeng/table";
import { CustomerService } from 'src/core/services/customer.service';
import { MobileUserData, MobileUsers } from '@/types/customer';
import { Pagination } from '@/types/response';
import { TrimWordsPipe } from "../../../../../pipes/trim-words.pipe";
import { CommonModule } from '@angular/common';
import { DialogModule } from "primeng/dialog";
import { CancelComponent } from "@/components/cancel";
import { ButtonModule } from 'primeng/button';
import { UserComponent } from "@/components/user";
import { RequestStatus } from '@/types/user';
import { TagModule } from "primeng/tag";
import { TabsModule } from "primeng/tabs";
import { ScrollPanelModule } from "primeng/scrollpanel";
import { PopoverModule } from "primeng/popover";
import { FlagComponent } from "@/components/svg-icon/flag";
import { TrashComponent } from "@/components/svg-icon/trash";
import { SortComponent } from "@/components/sort";
import { DividerModule } from "primeng/divider";
import { LockComponent } from "@/components/lock";


@Component({
    selector: 'app-customer',
    imports: [IconField, InputTextModule, CommonModule, InputIcon, ButtonModule,
    DateFilterComponent, FilterComponent, TableModule, TrimWordsPipe, DialogModule, CancelComponent, UserComponent, TagModule, TabsModule, ScrollPanelModule, PopoverModule, FlagComponent, TrashComponent, SortComponent, DividerModule, Filter, LockComponent],
    templateUrl: './customer.component.html',
    styleUrl: './customer.component.scss'
})
export class CustomerComponent {
    customer = signal<MobileUsers[]>([]);
    customerService = inject(CustomerService)
    paging = signal<Pagination | null>(null);
    enablePaginator = false;
    showModal = signal(false);
    selectedCustomer = signal<MobileUsers | null>(null);
    vendor: any;


    constructor() {
        this.getAllCustomers()
    }

    getAllCustomers() {
        this.customerService.getAllCustomers(1, 10).subscribe({
            next: (res: any) => {
                console.log(res.data);
                const page: Pagination = {
                    pageNumber: res.data.pageNumber,
                    pageSize: res.data.pageSize,
                    totalPages: res.data.totalPages,
                    totalRecords: res.data.totalPages
                }
                this.paging.set(page)
                const resp = res.data.data

                this.customer.set(resp)
                if (resp.length > res.data.pageSize) {
                    this.enablePaginator = true;
                }

            }
        })

    }



    flagVendor(arg0: any) {
        throw new Error('Method not implemented.');
    }
    suspendVendor(arg0: any) {
        throw new Error('Method not implemented.');
    }
    deleteVendor(arg0: any) {
        throw new Error('Method not implemented.');
    }


    closeDetails() {
        this.showModal.set(false);
    }
    getOrderStatus(arg0: any) {
        throw new Error('Method not implemented.');
    }
    openDetails(customer: any) {
        this.showModal.set(true);
        this.selectedCustomer.set(customer);
    }
    getStatus(status: boolean) {
        return status ? 'Active' : 'Inactive';
    }
    getSeverity(status: number) {
        switch (status) {
            case 0:
                return 'info';
            case 1:
                return 'warn';
            case 2:
                return 'danger';
            case 3:
                return 'success';
            case 4:
                return 'secondary';
            default:
                return;
        }
    }
}
