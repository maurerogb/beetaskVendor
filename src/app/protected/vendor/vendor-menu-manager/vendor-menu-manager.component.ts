import { MenuType } from '@/types/product';

import { Categories, Tag, Product, OtherProduct, OtherProducts, AssociatedProduct, AssociateProduct } from './../../../types/product';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Button } from "primeng/button";
import { SplitButton } from "primeng/splitbutton";
import { TableModule } from 'primeng/table';
import { ToggleSwitch } from "primeng/toggleswitch";
import { Drawer } from "primeng/drawer";
import { TabPanels, TabPanel, Tabs, TabList, Tab } from "primeng/tabs";
import { Select } from "primeng/select";
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { ProductService } from 'src/core/services/product.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/core/services/account.service';
import { Badge } from "primeng/badge";
import { NairaCurrencyPipe } from "../../../../pipes/naira-currency.pipe";
import { TrimWordsPipe } from "../../../../pipes/trim-words.pipe";
import { MenuItem } from 'primeng/api';
import { Divider } from "primeng/divider";
import { Checkbox, CheckboxChangeEvent } from "primeng/checkbox";
import { Dialog } from "primeng/dialog";
// import { AssociatedProduct } from '../../../types/product';
import { TagModule } from 'primeng/tag';
import { Data } from '@/types/user';
import { VendorMenuComponent } from "@/protected/components/vendor-menu/vendor-menu.component";

@Component({
    selector: 'app-vendor-menu-manager',
    imports: [InputText, ReactiveFormsModule, Button, TextareaModule, SplitButton,
    ToggleSwitch, TableModule, TagModule, TabPanels, TabPanel, Tabs, TabList,
    FormsModule, CommonModule, Tab, Select, Badge, NairaCurrencyPipe, TrimWordsPipe, Divider, Checkbox, Dialog, VendorMenuComponent],
    templateUrl: './vendor-menu-manager.component.html',
    styleUrl: './vendor-menu-manager.component.scss'
})
export class VendorMenuManagerComponent implements OnInit {
    visible2: boolean = false;
    foodPicture: File | null = null;
    mainVision = signal<boolean>(false);
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
    constructor(fb: FormBuilder) {

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


        // this.getCategory();

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

    getstatus(product: Product): string {
        return product.instock ? "Available" : "Unavailable"
    }
    menuImage = signal<string>('')
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

    ngOnInit(): void {
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        this.accountService.getcurrentUser()
        this.getProductList();
        if (this.productId() == 0) {
            let id = localStorage.getItem('productId')
            if (id === undefined || id === null) {
                this.productId.set(0)
            }
            this.productId.set(JSON.parse(id ?? ''))
        }
    }



    addNewMenu() {
        this.mainVision.set(true)
        this.visible2 = true;
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
    refreach() {
        this.products.set(this.productList())
    }


    selectedCategory(evt: any) {
        console.log('Selected Option:', this.selectedOption);
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

}
