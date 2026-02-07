import { Component, Input, input } from '@angular/core';
import { SortComponent } from "../sort";
import { Divider } from "primeng/divider";
import { Filter } from "../filter";

@Component({
    selector: 'app-filter-sort',
    imports: [SortComponent, Divider, Filter],
    templateUrl: './filter-sort.component.html',
    styleUrl: './filter-sort.component.scss'
})
export class FilterSortComponent {
@Input() hideFilter: boolean = true;
@Input() hideSort: boolean = true;
}
