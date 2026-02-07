import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { SplitButton } from "primeng/splitbutton";
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { Button } from "primeng/button";


@Component({
    selector:'bt-breadcrum [bt-breadcrum]',
    imports: [CommonModule, SplitButton, Button],
    template:`  <div class="  flex justify-between">
        <div class="gap-x-2">
            <div class="font-bold text-2xl pb-2">Dashboard Overview</div>

            <div class="text-xl md:text-lg ">Welcome back Gooddy Kitchen</div>
        </div>

        <div class="flex gap-x-4">
            <p-splitbutton rounded="25" class="rounded-md " label="Update Availabity"  ></p-splitbutton>
            <p-button label="Add New Menu" rounded />
        </div>
    </div>`,
     host: {
        class: 'col-span-12 grid grid-cols-12 gap-4'
    }
})

export class Breadcrumb {
}
