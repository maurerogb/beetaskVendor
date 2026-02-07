import { Component, inject, Inject, signal } from '@angular/core';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { FilterComponent } from "@/components/filter";
import { TableModule } from "primeng/table";
import { InputTextModule } from 'primeng/inputtext';
import { Dialog } from "primeng/dialog";
import { Tag } from "primeng/tag";
import { ButtonModule } from 'primeng/button';
import { Checkbox } from "primeng/checkbox";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CommonTypes } from '@/types/user';
import { VendorService } from 'src/core/services/vendor.service';

@Component({
    selector: 'app-business-types',
    imports: [IconField, CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputIcon, DateFilterComponent, FilterComponent, TableModule, Dialog, Tag, Checkbox],
    templateUrl: './business-types.component.html',
    styleUrl: './business-types.component.scss'
})
export class BusinessTypesComponent {
    showDialog: boolean = false;
    businessTypes = signal<any[]>([])
    btForm: FormGroup | null;
    protected readonly vendorService = inject(VendorService);


    constructor(fb: FormBuilder) {
        this.btForm = fb.group({
            id: [0],
            businessTypeName: ['', Validators.required],
            description: [''],
            isActive: [false]
        });
        this.getBusiness();
    }

    addBusinessTypes() {
        this.showDialog = true
    }
    openDetails(item: CommonTypes) {
        this.showDialog = true

        this.btForm?.patchValue({
            id: item.id,
            businessTypeName: item.Name,
            description: item.description,
            isActive: item.isActive
        })
    }
    save() {
        const form = this.btForm?.value;
        const data = {
            id: form.id,
            businessTypeName: form.businessTypeName,
            description: form.description,
            isActive: form.isActive
        }
        console.log(data);

        if (data.id == 0) {

            this.vendorService.saveBusinessTypes(data).subscribe({
                next: (resp => {
                    if (resp.responseCode == 0) {
                        this.getBusiness();
                        this.btForm?.reset()
                    }
                }),
                error(err) {
                    console.log(err);
                },
            })
        } else {
            this.vendorService.updateBusinessTypes(data).subscribe({
                next: (resp => {
                    if (resp.responseCode == 0) {
                        this.getBusiness();
                        this.btForm?.reset()
                    }
                }),
                error(err) {
                    console.log(err);
                },
            })
        }
    }
    cancel() {
        this.showDialog = false;
        this.btForm?.reset();

    }
    getActiveStatus(status: boolean): string {

        let result = status ? 'Active' : 'Disabled'
        return result;
    }
    getBusiness() {
        this.vendorService.getallBusinessTypes().subscribe({
            next: (resp => {
                if (resp.responseCode == 0) {
                    this.businessTypes.set(resp.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        })
    }

}
