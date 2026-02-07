import { Component } from '@angular/core';
import { landingLogo } from "@/components/svg-icon/landing-logo";
import { AppStoreComponent } from "../../components/svg-icon/appstore-black";
import { PlaystoreBlackComponent } from "@/components/svg-icon/playstore-black";
import { Bike } from "@/components/svg-icon/bike";
import { FlyingChips } from "@/components/svg-icon/flying-chips"; 
import { PhoneComponent } from '@/components/svg-icon/phone';
import { BullsEyeComponent } from '@/components/svg-icon/bullseye';
 
import { RouterLink} from "@angular/router";
import { BowlComponent } from '@/components/svg-icon/bowl';
import { FooterLogoComponent } from '@/components/svg-icon/footer-logo';
import { DividerModule } from 'primeng/divider';
import { HalfPhoneComponent } from '@/components/svg-icon/half-phone';



@Component({
  selector: 'app-landing-page',
  imports: [DividerModule,HalfPhoneComponent ,landingLogo,BowlComponent, FooterLogoComponent, RouterLink, PhoneComponent,BullsEyeComponent ,AppStoreComponent, PlaystoreBlackComponent, Bike, FlyingChips],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

}
