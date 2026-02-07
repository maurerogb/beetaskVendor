import { ApiResponse } from '@/types/response';
import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { VendorDetails } from '@/types/user';

@Injectable({
    providedIn: 'root'
})
export class VendorService {


    http = inject(BaseService);
    public vendorinfo = signal<VendorDetails[]>([])

    getAllVendors() {
        return this.http.get<ApiResponse<VendorDetails>>(`Vendors/GetAll`)
    }
    getallBusinessTypes() {
        return this.http.get<ApiResponse<any>>(`BusinessType/getAll`)
    }
    getVendor(uuid: any) {
        return this.http.get<ApiResponse<VendorDetails>>(`Vendors/${uuid}`)
    }
    addVendor(data: any) {
        return this.http.post<ApiResponse<any>>(`Vendors`, data)
    }
    getBusinessTypes() {
        return this.http.get<ApiResponse<any>>(`BusinessType`)
    }
    saveBusinessTypes(data: any) {
        return this.http.post<ApiResponse<any>>(`BusinessType`, data)
    }
    updateBusinessTypes(data: any) {
        return this.http.put<ApiResponse<any>>(`BusinessType`, data)
    }
    acceptVendorRequest(vendorId: any, data: any) {
        return this.http.put<ApiResponse<any>>(`Vendors/AcceptRequest/${vendorId}`, data)
    }

    rejectVendorRequest(vendorId: any, data: any) {
        return this.http.put<ApiResponse<any>>(`Vendors/RejectRequest/${vendorId}`, data)
    }
    getVendorInfo() {
        console.log('vendorinfo ', this.vendorinfo());

        if (this.vendorinfo().length == 0) {
            let sd = localStorage.getItem('vendor-details');
            if (sd !== null) {
                const vendordetails = JSON.parse(sd) ?? ''
                return this.vendorinfo.set(vendordetails);
            }
        }
    }
}
