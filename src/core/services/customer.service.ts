import { CountryRes } from '@/types/blog';
import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiResponse } from '@/types/response';
import { MobileUserData } from '@/types/customer';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {
    http = inject(BaseService);


    getAllCustomers(page:number, pageSize: number){
      return  this.http.get<ApiResponse<MobileUserData>>(`Customer/GetAll?page=${page}&pageSize=${pageSize}`)
    }
}
