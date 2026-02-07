import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiResponse } from '../../app/types/response';
import { CategoryResponse, OtherProducts, Tag } from '@/types/product';
import { Product } from '../../app/types/product';
import { MenuType } from '@/types/product';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    http = inject(BaseService);

    updateProduct(data: any) {
        return this.http.put<ApiResponse<Product>>('Product', data)
    }
    addProduct(data: any) {
        return this.http.post<ApiResponse<Product>>('Product', data)
    }
    getAssProduct(productId: number, vendorId: string) {
        return this.http.get<ApiResponse<OtherProducts[]>>(`Product/GetAssociatedProductWithSelectedOnesCheck/${productId}?vendorId=${vendorId}`)
    }

    removeAssProduct(assId: number) {
        return this.http.get<ApiResponse<any>>(`Product/RemoveAssociate/${assId}`)
    }

    toggleProductAvailabity(productId: number, status: boolean) {
        return this.http.get<ApiResponse<any>>(`Product/ToggleProductAvailabity/ProductId/${productId}/status/${status}`)
    }

    toggleAllProductAvailabity(uuid: string, status: boolean) {
        return this.http.get<ApiResponse<Product[]>>(`Product/ToggleAllProductAvailabity/VendorId/${uuid}/status/${status}`)
    }
    getProduct(vendorId: any) {
        return this.http.get<ApiResponse<Product[]>>(`Product/vendor/${vendorId}`)
    }
    getNonMainProduct(vendorId: any) {
        return this.http.get<ApiResponse<OtherProducts[]>>(`Product/GetNonMainProduct/vendor/${vendorId}`)
    }
    saveAssociatedProduct(assProducts: any) {
        return this.http.post<ApiResponse<OtherProducts[]>>(`Product/AddAssociatedProduct`, assProducts)
    }
    getCategory() {
        return this.http.get<CategoryResponse>('Category')
    }

    addCategory(data: any) {
        return this.http.post<CategoryResponse>('Category', data)
    }

    updateCategory(data: any) {
        return this.http.put<CategoryResponse>('Category', data)
    }
    getTags() {
        return this.http.get<ApiResponse<Tag[]>>('Tags')
    }

    getMenuType() {
        return this.http.get<ApiResponse<MenuType[]>>('MenuType')
    }

    createMenu(data: any) {
        return this.http.post<ApiResponse<any>>(`MenuType`, data)
    }

    updateMenu(data: any) {
        return this.http.put<ApiResponse<any>>(`MenuType`, data)
    }
}
