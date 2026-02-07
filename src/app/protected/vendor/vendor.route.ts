
import { LayoutComponent } from '@/protected/vendor/layout/layout.component';
import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VendorDashboardComponent } from './vendor-dashboard/vendor-dashboard.component';
import { VendorOrderComponent } from './vendor-order/vendor-order.component';
import { VendorMenuManagerComponent } from './vendor-menu-manager/vendor-menu-manager.component';
import { VendorEarningsComponent } from './vendor-earnings/vendor-earnings.component';
import { VendorReportComponent } from './vendor-report/vendor-report.component';
import { PayoutComponent } from './payout/payout.component';
import { DateFilterComponent } from '@/components/date-filter/date-filter.component';
import { VendorSettingComponent } from './vendor-setting/vendor-setting.component';


export default [
    {path:'',component: LayoutComponent,
        children:[
            {path: '', redirectTo: 'overview', pathMatch: 'full' },
            {path:'overview', component: VendorDashboardComponent},
            {path:'orders', component: VendorOrderComponent},

            {path:'menu-management', component: VendorMenuManagerComponent},
            {path:'report', component: VendorReportComponent},
            {path:'payout', component: PayoutComponent},
            {path:'date-filter', component: DateFilterComponent},
            {
                path:'settings',
                loadChildren:()=> import('./vendor-setting/vendor.route')
            }
        ]
    }
    //{path:'', loadComponent:()=> import('./vendor-dashboard/vendor-dashboard.component').then(v=> v.VendorDashboardComponent)},


    ]
