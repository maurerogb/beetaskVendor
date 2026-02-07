import { Component } from '@angular/core';
import { VendorBannarComponent } from "@/public/component/vendor-bannar/vendor-bannar.component";
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-onboard',
  imports: [ RouterModule],
  templateUrl: './onboard.component.html',
  styleUrl: './onboard.component.scss'
})
export class OnboardComponent {

}
