import { Component } from '@angular/core';
import { ToggleSwitch } from "primeng/toggleswitch";
import { FatLineCompnent } from "../../vendor-dashboard/components/fat-line";

@Component({
  selector: 'app-notification-preferences',
  imports: [ToggleSwitch, FatLineCompnent],
  templateUrl: './notification-preferences.component.html',
  styleUrl: './notification-preferences.component.scss'
})
export class NotificationPreferencesComponent {

}
