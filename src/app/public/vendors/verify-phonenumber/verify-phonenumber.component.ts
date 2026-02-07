import { ResendOtp, ValideOtp } from './../../../types/user';
import { Component, inject, OnInit, signal } from '@angular/core';
import { LogoComponent } from "@/public/component/logo/logo.component";
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MessageModule } from "primeng/message";
import { ButtonModule } from 'primeng/button';
import { InputOtpModule } from 'primeng/inputotp';
import { Router } from '@angular/router';
import { AccountService } from 'src/core/services/account.service';
import { MaskPipe } from "../../../../pipes/mask.pipe";

@Component({
    selector: 'app-verify-phonenumber',
    imports: [LogoComponent, InputOtpModule, ReactiveFormsModule, MessageModule, ButtonModule, MaskPipe],
    templateUrl: './verify-phonenumber.component.html',
    styleUrl: './verify-phonenumber.component.scss'
})
export class VerifyPhonenumberComponent implements OnInit {
    protected accountService = inject(AccountService);
    protected phone = signal('');
    otpForm: FormGroup
    formSubmitted: boolean = false;

    resendOtp() {
        this.phone.set('');
        const user =  this.accountService.userDetails();
        // JSON.parse(localStorage.getItem('signup-details')!);
        const resend: ResendOtp = {
            userName: user!.userName,
            phoneNumber: user!.phoneNumber
        }
        this.accountService.resendOtp(resend).subscribe({
            next: (res => {
                console.log(res);
                this.phone.set(user!.phoneNumber)
            })
        })
    }
    countine() {

        const user = this.accountService.userDetails();
        let otp: ValideOtp = {
            UserName: user!.userName,
            otp: this.otpForm.value.value
        }
        this.accountService.validateOtp(otp).subscribe({
            next: (res => {
                console.log(res);
                this.route.navigate(['/vendor/onboarding/vendor-details']);
            })
        })
    }


    constructor(private readonly fb: FormBuilder, private readonly route: Router) {
        this.otpForm = this.fb.group({
            value: ['', [Validators.required, Validators.minLength(4)]]
        });
    }
    ngOnInit(): void {
        // this.phone.set(this.accountService.phoneNumber())
    }

    isInvalid(controlName: string) {
        //console.log(this.otpForm.get(controlName)?.invalid);
        const control = this.otpForm!.get(controlName);
        return control?.invalid && (control.touched || this.formSubmitted);
    }
}
