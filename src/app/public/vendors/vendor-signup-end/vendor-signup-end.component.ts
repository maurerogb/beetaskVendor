import { Component, inject } from '@angular/core';
import { LogoComponent } from "@/public/component/logo/logo.component";
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { AccountService } from 'src/core/services/account.service';

@Component({
    selector: 'app-vendor-signup-end',
    imports: [LogoComponent, ButtonModule],
    templateUrl: './vendor-signup-end.component.html',
    styleUrl: './vendor-signup-end.component.scss'
})
export class VendorSignupEndComponent {
    accountService = inject(AccountService)
    constructor(private readonly router: Router) { }
    submitDone() {
        this.accountService.logout()
    }

}
