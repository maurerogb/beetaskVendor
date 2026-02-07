import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
    selector:'bt-filter',
    imports:[CommonModule,],
    template:`
<div class="border  rounded-lg  bg-white shadow-md p-2  ">
        <i class="pi pi-filter mx-3"></i> Filter</div>
`})
export class FilterCompnent {

}
