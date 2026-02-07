import { Component } from '@angular/core';
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { SalesSvgComponent } from '@/components/svg-icon/sales-svg';
import { FilterCompnent } from "../vendor-dashboard/components/filter";
import { TableModule } from "primeng/table";

@Component({
    selector: 'app-vendor-report',
    imports: [DateFilterComponent, SalesSvgComponent, FilterCompnent, TableModule],
    templateUrl: './vendor-report.component.html',
    styleUrl: './vendor-report.component.scss'
})
export class VendorReportComponent {
    dateRange: any;
}
