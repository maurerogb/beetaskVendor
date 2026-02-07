import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
    const account = inject(AccountService);


    if (account.isAuthenticated()) {
        return true;
    }

    account.logout();
    return true;
};
