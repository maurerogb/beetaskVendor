import { Component } from '@angular/core';
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { OrdinalDatePipe } from "../../../../pipes/ordinal-date.pipe";
import { MaskNumberPipe } from "../../../../pipes/mask-number";
import { InputNumber } from "primeng/inputnumber";
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-payout',
  imports: [OrdinalDatePipe, MaskNumberPipe, InputTextModule, TableModule],
  templateUrl: './payout.component.html',
  styleUrl: './payout.component.scss'
})
export class PayoutComponent {
today:any
bankAccount: string = '0439730126'
constructor(){
    this.today = new Date()
}
}
