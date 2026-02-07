import { Component, inject, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { RegistrationBannerComponent } from "../vendor-registration/registration-banner/registration-banner.component";
import { CommonModule } from '@angular/common';
import { AccountService } from 'src/core/services/account.service';

@Component({
    selector: 'app-vendor-login',
    imports: [ButtonModule, CommonModule, ReactiveFormsModule,
        CheckboxModule, InputTextModule, PasswordModule, FormsModule,
        RouterModule, RippleModule, RegistrationBannerComponent],

    templateUrl: './vendor-login.component.html',
    styleUrl: './vendor-login.component.scss'
})
export class VendorLoginComponent {

    signinForm: FormGroup;
private readonly accountService = inject(AccountService)

    constructor(private readonly fb: FormBuilder, private readonly router:Router) {
        this.signinForm = this.fb.group({
            userName: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.accountService.logout()
    }

    passwordMatchValidator(form: FormGroup) {
        const password = form.get('password')?.value;
        const confirmPassword = form.get('confirmPassword')?.value;
        return password === confirmPassword ? null : { mismatch: true };
    }

    onSubmit() {
        const form = this.signinForm.value
        const userdata = {
            'username': form.userName,
            'password': form.password
        }
        console.log(userdata);

        this.accountService.login(userdata).subscribe({
            next: resp=> {
                if(resp.isSuccess){
                    this.router.navigate(['/vendorside/overview'])
                }
                console.log(resp);

            }
        })

    }

}
