import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";


@Component({
    selector:'bt-empty-table',
    imports:[CommonModule,],
    template:`
     <div class="flex p-3 mt-8 border w-full rounded-lg justify-center items-center">
            <div class="m-4 text-lg ">
                No Recent Order Available
            </div>
        </div>
    `,
     host: {
        class: 'col-span-12 grid grid-cols-12 gap-4'
    }
})

export class EmptyTableCompnent {

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
