import { Component } from '@angular/core';
import { ToggleSwitch } from "primeng/toggleswitch";
import { TableModule } from "primeng/table";

@Component({
  selector: 'app-order-deal',
  imports: [ToggleSwitch, TableModule],
  templateUrl: './order-deal.component.html',
  styleUrl: './order-deal.component.scss'
})
export class OrderDealComponent {


    openDetails(order: any){

    }
}
