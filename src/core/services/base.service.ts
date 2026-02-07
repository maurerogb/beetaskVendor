import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    constructor(private readonly http: HttpClient) { }

    private getHeaders(customHeaders?: { [key: string]: string }): HttpHeaders {
        let headers = new HttpHeaders();

        // Set token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
            headers = headers.set('Authorization', `Bearer ${token}`);
        }

        // Add custom headers if provided
        if (customHeaders) {
            for (const key in customHeaders) {
                if (customHeaders.hasOwnProperty(key)) {
                    headers = headers.set(key, customHeaders[key]);
                }
            }
        }

        return headers;
    }

    get<T>(url: string, customHeaders?: { [key: string]: string }): Observable<T> {
        return this.http.get<T>(url, {
            headers: this.getHeaders(customHeaders)
        });
    }

    post<T>(url: string, data: any, customHeaders?: { [key: string]: string }): Observable<T> {
        return this.http.post<T>(url, data, {
            headers: this.getHeaders(customHeaders)
        });
    }

    put<T>(url: string, data: any, customHeaders?: { [key: string]: string }): Observable<T> {
        return this.http.put<T>(url, data, {
            headers: this.getHeaders(customHeaders)
        });
    }

    delete<T>(url: string, customHeaders?: { [key: string]: string }): Observable<T> {
        return this.http.delete<T>(url, {
            headers: this.getHeaders(customHeaders)
        });
    }
}
