import { Component, inject, signal } from '@angular/core';
import { CheckboxModule } from "primeng/checkbox";
import { TagModule } from "primeng/tag";
import { TableModule } from "primeng/table";
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { FilterComponent } from "@/components/filter";
import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from 'src/core/services/product.service';
import { FileUploadComponent } from "@/components/fileupload/fileupload.component";
import { CancelComponent } from "@/components/cancel";

@Component({
    selector: 'app-menu-types',
    imports: [CheckboxModule, RippleModule, DialogModule, ButtonModule, ReactiveFormsModule,
        InputTextModule, TagModule, TableModule, DateFilterComponent, FilterComponent,
        InputIcon, IconField, FileUploadComponent, CancelComponent],
    templateUrl: './menu-types.component.html',
    styleUrl: './menu-types.component.scss'
})
export class MenuTypesComponent {
    showDialog: boolean = false
    menuTypes = signal<any[]>([])
    imageUrl = signal<string>('')
    btForm: FormGroup | null;
    menuPicture: File | null = null;

    productService = inject(ProductService)

    constructor(fb: FormBuilder) {
        this.btForm = fb.group({
            id: [0],
            menuTypeName: ['', Validators.required],
            description: [''],
            isActive: [false],
            isMain: [false]
        });
        this.getAllMenu();
    }

    closeFormDetails() {
        this.showDialog = false
    }
    getAllMenu() {
        this.productService.getMenuType().subscribe({
            next: resp => {
                console.log(resp);
                if (resp.responseCode == 0) {
                    this.menuTypes.set(resp.data)
                }
            }
        })
    }

    getActiveStatus(status: boolean): string {
        let result = status ? 'Active' : 'Disabled'
        return result;
    }
    onMenuUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.menuPicture = fileInput.files[0];
        }
        console.log(this.menuPicture?.name);
    }

    openDetails(item: any) {
        this.showDialog = true
        console.log(item);
        this.imageUrl.set(item.imgLink)
        this.btForm?.patchValue({
            id: item.id,
            menuTypeName: item.typeName,
            description: item.description,
            isActive: item.isActive,
            isMain: item.isMain
        })
    }
    addMenu() {
        this.showDialog = true
    }
    cancel() {
        this.btForm?.reset()
    }
    save() {
        const menu = this.btForm?.value
        const formData = new FormData();
        formData.append('id', menu.id);
        formData.append('TypeName', menu.menuTypeName);
        formData.append('Discription', menu.description);
        formData.append('isMain', menu.isMain);
        formData.append('IsActive', menu.isActive);
        formData.append('CategoryId', '0');
        if (this.menuPicture) {
            formData.append('ImgFile', this.menuPicture);
        }
        console.log(menu.id);

        if (menu.id == 0) {
            this.productService.createMenu(formData).subscribe({
                next: resp => {
                    this.btForm?.reset()
                    this.getAllMenu()
                    this.showDialog = false
                }
            })
        } else {
            this.productService.updateMenu(formData).subscribe({
                next: resp => {
                    this.btForm?.reset()
                    this.getAllMenu()
                    this.showDialog = false
                }
            })
        }
    }
}
