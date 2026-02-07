import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AccountService } from 'src/core/services/account.service';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, ButtonModule, CommonModule, ReactiveFormsModule,
        CheckboxModule, InputTextModule, PasswordModule, FormsModule,],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    signinForm: FormGroup;
    private readonly accountService = inject(AccountService)


    constructor(private readonly fb: FormBuilder, private readonly router: Router) {
        this.signinForm = this.fb.group({
            userName: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
        this.accountService.logout()
    }

    onSubmit() {
        const form = this.signinForm.value
        const userdata = {
            'username': form.userName,
            'password': form.password
        }
        console.log(userdata);

        this.accountService.login(userdata).subscribe({
            next: resp => {
                if (resp.isSuccess) {
                    this.router.navigate(['/admin'])
                }
                console.log(resp);

            }
        })

    }
}
