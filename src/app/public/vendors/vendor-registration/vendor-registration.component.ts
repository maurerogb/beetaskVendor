import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { RegistrationBannerComponent } from "./registration-banner/registration-banner.component";
import { InputOtp } from "primeng/inputotp";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Divider } from "primeng/divider";
import { PasswordModule } from 'primeng/password';
import { Router } from '@angular/router';
import { AccountService } from 'src/core/services/account.service';
import { RegisterUser } from '@/types/user';
import { BulgersComponent } from "@/public/component/bulgers/bulgers.component";
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-vendor-registration',
    imports: [InputTextModule, PasswordModule, ButtonModule, RippleModule, RegistrationBannerComponent, ReactiveFormsModule],
    templateUrl: './vendor-registration.component.html',
    styleUrl: './vendor-registration.component.scss'
})
export class VendorRegistrationComponent {

    accountService = inject(AccountService)
    messageService = inject(MessageService);

    signUp() {

        let data: RegisterUser = this.newVendorForm.value;
        data.regSource = 2;
        this.accountService.register(data).subscribe({
            next: ((res: any) => {

                this.messageService.add({
                    severity: 'info',
                    summary: 'OTP',
                    detail: 'Your OTP is ' + res.data.otpNo,
                    life: 6000
                });
                this.accountService.userDetails.set(data)
                this.accountService.phoneNumber.set(data.phoneNumber)
                this.route.navigate(['/vendor/onboarding/verify-phone-number'])
            }),
            error(err) {
                console.log(err);
            },
        })

    }
    togglePassword() {

    }
    newVendorForm: FormGroup;
    hidePassword: any;

    constructor(private readonly fb: FormBuilder, private readonly route: Router) {
        this.newVendorForm = this.fb.group({
            fullName: ['', [Validators.required]],
            userName: ['', [Validators.required]],
            emailAddress: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', [Validators.required]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        }
        );
        localStorage.removeItem('signup-details')
        localStorage.removeItem('user')
    }

}
