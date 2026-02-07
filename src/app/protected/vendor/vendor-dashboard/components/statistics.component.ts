import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";


@Component({
    selector:'bt-start',
    imports:[CommonModule,],
    template:`<div *ngFor="let stat of stats"  class="col-span-12 md:col-span-4">
        <div class="card col-span-3 shadow-md">
            <div class="flex  items-center p-4">

                <div class="text-left gap-y-2 font-bold flex flex-col">
                    <span class="text-lg ">{{stat.label}}</span>
                    <span class="text-4xl  mt-2">{{stat.amount | number}}</span>
                    <span class="text-sm  mt-2"> <i class="font-bold !text-sm pi pr-1 pi-arrow-up text-green-500"></i> {{stat.ratio }}% VS Yesterday</span>
                </div>
            </div>

        </div>
    </div>`,
    host: {
        class: 'col-span-12 grid grid-cols-12 gap-4'
    }
})

export class VendorStartisticCompnent {

    stats = [
        {
            icon: 'pi pi-twitter',
            iconClass: 'text-muted-color',
            amount: '0.0',
            label: 'Order',
            ratio: '0'
        },
          {
            icon: 'pi pi-twitter',
            iconClass: 'text-muted-color',
            amount: '0.0',
            label: 'Revenue',
            ratio: '0',
        },
          {
            icon: 'pi pi-twitter',
            iconClass: 'text-muted-color',
            amount: '0.0',
            label: 'Completed Delivery',
            ratio: '0',
        }
    ]
}
