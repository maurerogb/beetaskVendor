
import { LayoutComponent } from '@/protected/vendor/layout/layout.component';
import { DateFilterComponent } from '@/components/date-filter/date-filter.component';
import { VendorProfileComponent } from './vendor-profile/vendor-profile.component';
import { VendorSettingComponent } from './vendor-setting.component';
import { BusinesshourComponent } from './businesshour/businesshour.component';
import { RestaurantLocationComponent } from './restaurant-location/restaurant-location.component';
import { NotificationPreferencesComponent } from './notification-preferences/notification-preferences.component';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { OrderDealComponent } from './order-deal/order-deal.component';


export default [
    {path:'',component: VendorSettingComponent,
        children:[
            { path: '', redirectTo: 'vendor-profile', pathMatch: 'full' },
            {path:'vendor-profile', component: VendorProfileComponent},
            {path:'business-time', component: BusinesshourComponent},
            {path:'location', component: RestaurantLocationComponent},
            {path:'notifications', component: NotificationPreferencesComponent},
            {path:'account-security', component: AccountSecurityComponent},
            {path:'order-deal', component: OrderDealComponent}
        ]
    }
    //{path:'', loadComponent:()=> import('./vendor-dashboard/vendor-dashboard.component').then(v=> v.VendorDashboardComponent)},


    ]
