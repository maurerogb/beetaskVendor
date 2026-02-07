import { inject, Injectable } from '@angular/core';
import {
    HttpInterceptorFn,
    HttpRequest,
    HttpHandlerFn,
    HttpEvent
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

import { LoaderService } from '../services/loader.service';

export const LoaderInterceptor: HttpInterceptorFn =
    (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
        const loaderService = inject(LoaderService);

        loaderService.show();

        return next(req).pipe(
            finalize(() => {
                loaderService.hide();
            })
        );
    };
