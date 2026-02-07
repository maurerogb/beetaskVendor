import { Component, signal } from '@angular/core';
import { FilterComponent } from "@/components/filter";
import { BellComponent } from "@/components/bell";
import { DividerModule } from "primeng/divider";

@Component({
    selector: 'app-dashboard',
    imports: [FilterComponent, BellComponent, DividerModule],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
    count = signal<{}>({})

    constructor() {
        this.count.set({})
    }

    stats = [
        {
            icon: 'pi pi-twitter',
            iconClass: 'text-muted-color',
            amount: '0.0',
            label: 'Total Orders',
            ratio: '0'
        },
        {
            icon: 'pi pi-twitter',
            iconClass: 'text-muted-color',
            amount: '0.0',
            label: 'Vendors',
            ratio: '0',
        },
        {
            icon: 'pi pi-twitter',
            iconClass: 'text-muted-color',
            amount: '0.0',
            label: 'Total Users',
            ratio: '0',
        },
        {
            icon: 'pi pi-twitter',
            iconClass: 'text-muted-color',
            amount: '0.0',
            label: 'Total Revenue',
            ratio: '0',
        }
    ]
}
