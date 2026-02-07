import { Component, EventEmitter, Output } from '@angular/core';
import { DatePicker } from "primeng/datepicker";
import { OrdinalDatePipe } from "../../../pipes/ordinal-date.pipe";

@Component({
    selector: 'app-date-filter',
    imports: [OrdinalDatePipe],
    templateUrl: './date-filter.component.html',
    styleUrl: './date-filter.component.scss'
})
export class DateFilterComponent {
    constructor() { this.today = new Date() }
    showDatepicker: boolean = true;
    today: any
    @Output() selecdedDate = new EventEmitter<string>();

    changeControl() {
        this.showDatepicker = this.showDatepicker == true ? false : true
        console.log(this.showDatepicker);
    }

     sendMessage() {
    this.selecdedDate.emit(this.today);
  }
    selectedDate(evt: any) {
        console.log(evt);
        this.today = evt
        this.showDatepicker = true

    }

}
