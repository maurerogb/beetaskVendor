import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";


@Component({
    selector:'bt-fat-line',
    imports:[CommonModule,],
    template:`
    <svg width="684" height="15" viewBox="0 0 684 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M-0.000479673 8.06593C0.000982302 8.39926 0.00244428 8.73259 0.00390625 9.06592C11.4058 9.456 22.8077 9.82373 34.2094 10.1691C135.076 13.2246 235.934 14.5312 336.785 14.0889C441.134 13.6312 545.476 11.4126 649.809 7.43321C661.208 6.99846 672.606 6.5427 684.004 6.06592C684.002 5.73259 684.001 5.39926 684 5.06593C672.598 4.68915 661.196 4.33338 649.794 3.99863C545.43 0.934542 441.073 -0.368667 336.724 0.0890035C235.873 0.531332 135.03 2.72257 34.194 6.66273C22.7958 7.10811 11.3976 7.57585 -0.000479673 8.06593Z"
                    fill="#D8D7D7" />
            </svg>
    `,
     host: {
        class: 'col-span-12 grid grid-cols-12 gap-4'
    }
})

export class FatLineCompnent {

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
