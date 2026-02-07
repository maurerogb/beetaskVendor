import { computed, Injectable, signal } from '@angular/core';
import { BaseService } from './base.service';
import { UserLogin } from '@/types/user';
import { tap } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
    providedIn: 'root'
})
export class AccountService {
    public currentUser = signal<UserLogin | null>(null);
    public phoneNumber = signal<string>('')
    public userDetails = signal<any>({})
    constructor(private readonly http: BaseService, private readonly router: Router) { }


    private readonly token = signal<string | null>(
        localStorage.getItem('token')
    );

    isAuthenticated = computed(() => {
        const t = this.token();
        return !!t && !this.isTokenExpired(t);
    });
    deleteAdminUser(uuid:string) {
        return this.http.delete(`Account/delete-admin/${uuid}`);
    }
    registerVendor(data: any) {
        return this.http.post('Account/Add-Vendor-By-Admin', data);
    }
    updateAdminUser(data: any) {
        return this.http.put('Account/update-admin-user', data);
    }
    registerRider(data: any) {
        return this.http.post('Account/Add-Rider-Admin', data);
    }
    getAllAdminUser() {
        return this.http.get('Account/GetAdminUsers');
    }
    register(data: any) {
        return this.http.post('Account/Registrationweb', data);
    }
    registerAdminUser(data: any) {
        return this.http.post('Account/AdminRegistration', data);
    }
    getUserRoles(uuid: any) {
        return this.http.get(`Account/GetUserRoles/${uuid}`);
    }
    getRoles() {
        return this.http.get('Account/Get-Roles');
    }
    validateOtp(data: any) {
        return this.http.post('Account/validate-otp-web', data)
            .pipe(
                tap(res => {
                    console.log(res);
                    localStorage.setItem('signup-details', JSON.stringify(res))
                }));
    }
    resendOtp(data: any) {
        return this.http.post('Account/ResendOtpWeb', data);
    }

    getProfile(uuId: any) {
        return this.http.get(`Account/get-profile-details/${uuId}`);
    }

    login(data: any) {
        return this.http.post<UserLogin>('Account/Login', data).pipe(
            tap(user => this.setUser(user))
        );
    }

    getToken() {
        return this.token();
    }
    getcurrentUser() {
        console.log(this.currentUser());

        if (!this.currentUser() || null) {
            let sd = localStorage.getItem('signup-details');
            if (sd !== null) {
                const user_signup = JSON.parse(sd) ?? ''
                return this.currentUser.set(user_signup);
            }
            let userDetails = localStorage.getItem('user');
            if (userDetails !== null) {
                const user = JSON.parse(userDetails ?? '');
                this.currentUser.set(user);
            }

        }
    }

    logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('signup-details')
        localStorage.removeItem('vendor-details')
        this.currentUser.set(null)
        this.router.navigate(['/vendor/onboarding/login'])
    }

    setUser(user: UserLogin) {
        this.currentUser.set(user);
        localStorage.setItem('user', JSON.stringify(user));
        this.token.set(user.token);
    }
    decodeJwt(token: string): any {
        const payload = token.split('.')[1];
        return JSON.parse(atob(payload));
    }

    isTokenExpired(token: string): boolean {
        const { exp } = this.decodeJwt(token);
        return Date.now() >= exp * 1000;
    }

}
