import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiResponse } from '@/types/response';
import { CustomerOrder, Order, OrderData, Orders, OrderSummary } from '@/types/order';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    http = inject(BaseService);


    jfile = 'src/assets/data/orders.json'

    getAllOrder(): Observable<Orders[]> {
        return this.http.get<Orders[]>(this.jfile).pipe(
            map((orders) => {
                // Optionally compute totalAmount if not included
                return orders.map(order => ({
                    ...order,
                    totalAmount: order.item.unitPrice * order.item.quantity
                }));
            }),
            catchError((error) => {
                console.error('Error fetching orders:', error);
                return of([]); // Return an empty array on error
            })
        );
    }
    getOrders(vendorId: any, date: any) {
        return this.http.get<ApiResponse<CustomerOrder[]>>(`Order/vendor/${vendorId}/date/${date}`)
    }

    getAllOrders(pageNo: number, pageSize: any) {
        return this.http.get<ApiResponse<OrderData>>(`Order/GetAllOrder?pageNumber=${pageNo}&pageSize=${pageSize}`)
    }

}
