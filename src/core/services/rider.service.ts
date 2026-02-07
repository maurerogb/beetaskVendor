import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiResponse } from '@/types/response';

@Injectable({
    providedIn: 'root'
})
export class RiderService {

    http= inject(BaseService);

    registerRider(data: any) {
        return this.http.post<ApiResponse<any>>('Riders/RegisterRider', data);
    }

    getAllRiders() {
        return this.http.get<ApiResponse<any>>('Rider/GetAllRiders');
    }
}
