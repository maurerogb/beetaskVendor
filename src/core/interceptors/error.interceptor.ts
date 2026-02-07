import { HttpInterceptorFn, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, finalize, tap, throwError } from 'rxjs';
import { LoaderService } from '../services/loader.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
    const messageService = inject(MessageService);
    const loaderService = inject(LoaderService);

    loaderService.show();


    return next(req).pipe(
        tap({
            next: (event) => {


                if (event instanceof HttpResponse) {
                    const responseBody: any = event.body;
                    console.log(responseBody);

                    const responseCode = responseBody?.responseCode;
                    const description = responseBody?.description || 'Operation completed';
                    if (responseBody.isSuccess) {
                        messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: description,
                            life: 2000
                        });
                    }
                    else if (responseCode === 0) {
                        messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: description,
                            life: 2000
                        });
                    } else if (responseCode === 10) {

                        messageService.add({
                            severity: 'error',
                            summary: 'Error',
                            detail: description || 'An error occurred',
                            life: 3000
                        });
                    }
                    else if (responseBody.result.responseCode === 0) {
                        messageService.add({
                            severity: 'success',
                            summary: 'Success',
                            detail: description,
                            life: 2000
                        });
                    }
                    else {

                        messageService.add({
                            severity: 'warn',
                            summary: 'Unexpected Response',
                            detail: description || `Unknown response code: ${responseCode}`,
                            life: 3000
                        });
                    }
                }
            },
            error: (error: HttpErrorResponse) => {
                // const err:any =error.error;
                console.log('error  ', error.error);
                if(error.error.isSuccess===false){
                    messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: `Status ${error.status} - ${error.error.message || 'An error occurred'}`,
                        life: 3000
                    });
                    return;
                }
                messageService.add({
                    severity: 'error',
                    summary: 'HTTP Error',
                    detail: `Status ${error.status} - ${error.statusText}`,
                    life: 3000
                });
                // loaderService.hide();
            }
        }),
        finalize(() => loaderService.hide())

    );


};
