import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { ApiResponse } from '@/types/response';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {
    private readonly http = inject(BaseService);

    getDocument() {
        return this.http.get<ApiResponse<any>>(`DocumentType`)
    }

    addDocument(data: any) {
        return this.http.post<ApiResponse<any>>(`DocumentType`, data)
    }

    updateDocument(data: any) {
        return this.http.put<ApiResponse<any>>(`DocumentType/${data.id}`, data)
    }
}
