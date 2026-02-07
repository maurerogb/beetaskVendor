import { Component } from '@angular/core';
import { SplitButton, SplitButtonModule } from "primeng/splitbutton";
import { Button } from "primeng/button";
import { MenuItem } from 'primeng/api';
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { OrdinalDatePipe } from "../../../../pipes/ordinal-date.pipe";
import { DatePicker } from "primeng/datepicker";
import { VendorStartisticCompnent } from "../vendor-dashboard/components/statistics.component";
import { TableModule } from "primeng/table";

@Component({
    selector: 'app-vendor-earnings',
    imports: [Button, SplitButtonModule, OrdinalDatePipe, DatePicker, VendorStartisticCompnent, TableModule],
    templateUrl: './vendor-earnings.component.html',
    styleUrl: './vendor-earnings.component.scss'
})
export class VendorEarningsComponent {
    showDatepicker: boolean = false;
    today: any

    constructor() { this.today = new Date() }


 selectedDate(evt: any) {
        console.log(evt);
        this.today = evt
        this.showDatepicker = !this.showDatepicker

    }
    changeControl() {
        this.showDatepicker = this.showDatepicker == true ? false : true
        console.log(this.showDatepicker);

    }
    addNewMenu() {
        throw new Error('Method not implemented.');
    }
    items: MenuItem[] | undefined;
    selectedCategory(arg0: EventTarget | null) {
        throw new Error('Method not implemented.');
    }
    refreach() {
        throw new Error('Method not implemented.');
    }

}
