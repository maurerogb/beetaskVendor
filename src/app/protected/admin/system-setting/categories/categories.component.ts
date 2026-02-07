import { DateFilterComponent } from '@/components/date-filter/date-filter.component';
import { FilterComponent } from '@/components/filter';
import { Categories } from '@/types/product';
import { CommonTypes } from '@/types/user';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { ProductService } from 'src/core/services/product.service';
import { VendorService } from 'src/core/services/vendor.service';
import { UploadFileComponent } from "@/components/upload-file/upload-file.component";

@Component({
    selector: 'app-categories',
    imports: [IconField, CommonModule, ReactiveFormsModule, ButtonModule, InputTextModule, InputIcon, DateFilterComponent, FilterComponent, TableModule, Dialog, Tag, Checkbox, UploadFileComponent],
    templateUrl: './categories.component.html',
    styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
    showDialog: boolean = false;
    imageUrl: File | null = null;
    categories = signal<Categories[]>([])
    btForm: FormGroup | null;
    categoryImg= signal<string>("")
    protected readonly productService = inject(ProductService);


    constructor(fb: FormBuilder) {
        this.btForm = fb.group({
            id: [0],
            categoryName: ['', Validators.required],
            description: [''],
            isActive: [false]
        });
        this.getProductCategory();
    }

    addCategory() {
        this.showDialog = true
        this.categoryImg.set('')
        this.btForm?.reset()
    }
    openDetails(item: Categories) {
        this.showDialog = true
        this.btForm?.patchValue({
            id: item.id,
            categoryName: item.categoryName,
            description: item.description,
            isActive: item.isActive
        })
        this.categoryImg.set(item.imageUrl)
    }
    save() {
        const data: CommonTypes = this.btForm?.value;
        console.log(data);

        if (data.id == 0) {

            this.productService.addCategory(data).subscribe({
                next: (resp => {
                    if (resp.responsCode == 0) {
                        this.getProductCategory();
                        this.btForm?.reset()
                    }
                }),
                error(err) {
                    console.log(err);
                },
            })
        } else {
            this.productService.updateCategory(data).subscribe({
                next: (resp => {
                    if (resp.responsCode == 0) {
                        this.getProductCategory();
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
    onFileSelected(file: Event) {
        const input = file.target as HTMLInputElement;
        if (!input.files?.length) return;
    }
    getProductCategory() {
        this.productService.getCategory().subscribe({
            next: ((resp:any) => {
                if (resp.responseCode == 0) {
                    this.categories.set(resp.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        })
    }

}
