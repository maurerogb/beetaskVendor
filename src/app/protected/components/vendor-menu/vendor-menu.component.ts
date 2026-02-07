import { Component, inject, input, output, signal } from '@angular/core';
import { TabsModule } from "primeng/tabs";
import { NairaCurrencyPipe } from "../../../../pipes/naira-currency.pipe";
import { Tag, TagModule } from "primeng/tag";
import { CheckboxChangeEvent, CheckboxModule } from "primeng/checkbox";
import { SelectModule } from "primeng/select";
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from 'src/core/services/product.service';
import { AccountService } from 'src/core/services/account.service';
import { Categories, Product, MenuType, OtherProducts, AssociatedProduct, OtherProduct } from '@/types/product';
import { MenuItem } from 'primeng/api';
import { Data, VendorDetails } from '@/types/user';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { CancelComponent } from "@/components/cancel";
import { FileUploadComponent } from "@/components/fileupload/fileupload.component";

@Component({
    selector: 'app-vendor-menu',
    imports: [TabsModule, TextareaModule, InputTextModule, DividerModule, ReactiveFormsModule, ButtonModule, NairaCurrencyPipe, TagModule, CheckboxModule, SelectModule, ToggleSwitchModule, CancelComponent, FileUploadComponent],
    templateUrl: './vendor-menu.component.html',
    styleUrl: './vendor-menu.component.scss'
})
export class VendorMenuComponent {
    hideDialog = output<boolean>();
    vendorInfo = input<VendorDetails>();
    visible2: boolean = false;
    foodPicture: File | null = null;
    mainVision = signal<boolean>(true);
    flagAllInStock = signal<boolean>(false);
    menuForm: FormGroup | null
    selectedOption: string = '';

    private readonly productService = inject(ProductService);
    private readonly accountService = inject(AccountService);
    protected categories = signal<Categories[]>([])
    protected tags = signal<Tag[]>([])
    protected products = signal<Product[]>([])
    protected menuType = signal<MenuType[]>([])
    protected productList = signal<Product[]>([])

    protected otherProducts = signal<OtherProducts[]>([])
    protected selectedProduct = signal<Product | null>(null)
    items: MenuItem[] = []
    productId = signal<number>(0);
    assProducts: AssociatedProduct[] = []
    menuImage = signal<string>('')
    constructor(fb: FormBuilder) {
        console.log('Vendors => ', this.vendorInfo());


        this.menuForm = fb.group({
            itemName: ['', Validators.required],
            categoryId: ['', Validators.required],
            typeId: ['', Validators.required],
            isActive: ['', Validators.required],
            price: ['', Validators.required],
            shortDescription: ['', Validators.required],
            Id: [0],
            img: [''],
        })
        this.getCategory();
        this.getMenuType();
    }
    getMenuType() {
        if (this.menuType().length == 0) {
            this.productService.getMenuType().subscribe({
                next: resp => {
                    console.log(resp);
                    this.menuType.set(resp.data)
                }
            })
        }
    }
    closeTab() {
        this.hideDialog.emit(true);
    }
    getCategory() {
        if (this.categories().length == 0) {
            this.productService.getCategory().subscribe({
                next: resp => {

                    this.categories.set(resp.data)
                    this.setCategoryItems(resp.data);
                }
            })
        }
    }
    selectedRow(item: OtherProduct, evt: CheckboxChangeEvent) {
        //  console.log(evt.checked) //(evt.target as HTMLInputElement).value);

        if (evt.checked) {
            this.addAssProduct(item)
        } else {
            this.removeAssProduct(item)
        }

    }
    addAssProduct(product: OtherProduct) {
        const pId = this.productId();

        if (!this.assProducts.find(p => p.productId == product.id && p.MainProductId == pId)) {
            const newAP: AssociatedProduct =
            {
                productId: product.id,
                MainProductId: pId
            }
            //  product.selected = product.selected == false ? true : false;
            this.assProducts.push(newAP)
            console.log(this.assProducts.length);

        }
    }

    removeAssProduct(product: OtherProduct) {
        console.log(this.assProducts.length);

        const pId = this.productId();
        const index = this.assProducts.findIndex(p => p.productId == product.id && p.MainProductId == pId)
        if (index !== -1)
            this.assProducts.splice(index, 1)
        console.log(this.assProducts.length);
    }
    saveAssProduct() {

        if (this.assProducts.length > 0) {

            const data = [
                ... this.assProducts
            ]
            console.log(data);

            this.productService.saveAssociatedProduct(data).subscribe({
                next: res => {
                    if (res.responseCode == 0) {
                        this.mainVision.set(true)
                    }
                }
            })
        }

    }
    removeAssociat(itm: OtherProduct) {
        console.log(itm);
        this.otherProducts().map(aa => {
            aa.products.filter(p => p.id == itm.id).map(s => {
                s.selected = false
            })
        });
        this.productService.removeAssProduct(itm.assProductId).subscribe({
            next: (resp => {
                console.log(resp);

            })
        })

    }
    onOptionSelect(value: string) {
        this.selectedOption = value;
        this.products.set(this.productList())
        this.products.set(this.products().filter(c => c.categoryName === value))
        // console.log('Selected Option:', value);
    }

    setCategoryItems(category: any[]) {
        for (let index = 0; index < category.length; index++) {
            this.items.push({
                label: category[index].categoryName,
                command: () => this.onOptionSelect(category[index].categoryName)
            });
        }
    }
    selectedImage: string | ArrayBuffer | null = null;
    upLoadPicture(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.foodPicture = fileInput.files[0];
            const reader = new FileReader();
            reader.onload = e => {
                this.selectedImage = reader.result;
            };
            //  reader.readAsDataURL(fileInput);
        }
        // console.log(this.foodPicture?.name);

    }

    saveProduct() {
        const form = this.menuForm?.value;
        // let user = this.accountService.currentUser()?.data
        // console.log(user?.uuId!);

        const data = this.setProductForm(this.vendorInfo()?.uuid, form);

        if (this.selectedProduct()) {
            const data = this.setProductForm(this.vendorInfo()?.uuid, this.menuForm);
            this.productService.updateProduct(data).subscribe({
                next: res => {
                    console.log(res.data);
                    //this.mainVision.set(false);
                    this.getProductList();
                    this.getNonMainProduct()
                    this.selectedProduct.set({} as Product)
                    this.menuForm?.reset();
                }
            })
        } else {
            this.productService.addProduct(data).subscribe({
                next: res => {
                    console.log(res.data);
                    this.productId.set(res.data.productId)
                    // localStorage.setItem('productId', JSON.stringify(res.data.productId))
                    this.getProductList();
                    // this.mainVision.set(false);
                    //this.getNonMainProduct()
                    this.selectedProduct.set(null)
                    this.menuForm?.reset();
                }
            })
        }
    }

    getNonMainProduct() {
        let id = this.accountService.currentUser()?.data.uuId;
        this.productService.getNonMainProduct(id).subscribe({
            next: resp => {
                console.log(resp);
                this.otherProducts.set(resp.data)
                // this.categories.set(resp)
                // this.setCategoryItems(resp.data);
            }
        })
    }

    onImageUpload(event: Product) {
        const item = event;
    }

    private setProductForm(vendorId: any, form: any) {
        console.log(form);

        const formData = new FormData();
        formData.append('VendorId', vendorId!);
        formData.append('Price', form.price);
        formData.append('IsActive', form.isActive);
        formData.append('Instock', form.isActive);
        formData.append('CategoryId', form.categoryId);
        formData.append('ProductName', form.itemName);
        formData.append('Description', form.shortDescription);
        formData.append('TypeId', form.typeId);
        formData.append('Id', form.id ?? 0);
        if (this.foodPicture) {
            formData.append('PhotoFile', this.foodPicture);
        }
        return formData
    }

    getstatus(product: Product): string {
        return product.instock ? "Available" : "Unavailable"
    }

    updateProduct(item: Product) {
        this.visible2 = true;
        this.mainVision.set(true);
        this.menuImage.set(item.imgUrl)
        this.menuForm?.patchValue({
            itemName: item.productName,
            categoryId: item.categoryId,
            tagId: item.categoryId,
            isActive: item.isActive,
            price: item.price,
            shortDescription: item.description,
            typeId: item.typeId,
            id: item.productId
        });
        this.selectedProduct.set(item);

    }
    toggleProduct(product: Product) {
        this.productService.toggleProductAvailabity(product.productId, product.instock).subscribe({
            next: resp => {

            }
        })
    }

    toggleAll() {
        let status = this.flagAllInStock() ? false : true;
        this.flagAllInStock.set(status)
        console.log(this.flagAllInStock());
        let user = this.accountService.currentUser()?.data
        this.productService.toggleAllProductAvailabity(user?.uuId!, status).subscribe({
            next: resp => {
                if (resp.responseCode == 0) {
                    this.products.set(resp.data)
                }
            }
        });


    }

    getAssProduct(item: Product) {
        this.productId.set(item.productId)
        let user = this.accountService.currentUser()?.data
        console.log(user?.uuId!);
        this.otherProducts.set([])
        this.productService.getAssProduct(item.productId, user?.uuId!).subscribe({
            next: res => {
                this.otherProducts.set(res.data);
                this.selectedProduct.set(item);
                this.visible2 = true;
                this.mainVision.set(false);
            }

        })

    }

    getProductList() {
        let id = this.accountService.currentUser()?.data.uuId;
        this.productService.getProduct(id).subscribe({
            next: (res: any) => {
                if (res.responseCode == 0) {
                    this.productList.set(res.data.data)
                    this.products.set(res.data.data)
                    this.flagAllInStock.set(res.data.allInStock)
                }
            }
        })
    }


}
