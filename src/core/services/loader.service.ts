import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LoaderService {
    private requestsInProgress = 0;
    private loading = new BehaviorSubject<boolean>(false);

    isLoading$ = this.loading.asObservable();

    show() {
        this.requestsInProgress++;
        if (this.requestsInProgress === 1) {
            this.loading.next(true); // only show when first request starts
        }
    }

    hide() {
        if (this.requestsInProgress > 0) {
            this.requestsInProgress--;
        }
        if (this.requestsInProgress === 0) {
            this.loading.next(false); // hide only when all requests finish
        }
    }
}
