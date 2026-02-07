import { Component, Input } from '@angular/core';
import { LogoComponent } from "@/public/component/logo/logo.component";
import { RouterLink } from "@angular/router";
import { BulgersComponent } from "@/public/component/bulgers/bulgers.component";

@Component({
  selector: 'app-registration-banner',
  imports: [LogoComponent, RouterLink],
  templateUrl: './registration-banner.component.html',
  styleUrl: './registration-banner.component.scss'
})
export class RegistrationBannerComponent {
@Input() showLink!: boolean
}
