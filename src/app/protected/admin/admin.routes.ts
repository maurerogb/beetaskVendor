
import { LayoutComponent } from "../vendor/layout/layout.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { RidersComponent } from "./riders/riders.component";
import { BusinessTypesComponent } from "./system-setting/business-types/business-types.component";
import { CategoriesComponent } from "./system-setting/categories/categories.component";
import { CitysComponent } from "./system-setting/citys/citys.component";
import { DocumentTypeComponent } from "./system-setting/document-type/document-type.component";
import { LocalGovernmentComponent } from "./system-setting/local-government/local-government.component";
import { MenuTypesComponent } from "./system-setting/menu-types/menu-types.component";
import { VendorOrderComponent } from "./vendor-order/vendor-order.component";
import { VendorsComponent } from "./vendors/vendors.component";



export default [
    {
        path: '', component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'orders', component: VendorOrderComponent },

            { path: 'riders', component: RidersComponent },
            { path: 'vendors', component: VendorsComponent },
            {
                path:'manager',
                loadChildren: ()=> import('./admin-manager/admin-manager.route')
            },
            { path: 'cities', component: CitysComponent },
            { path: 'lgas', component: LocalGovernmentComponent },
            { path: 'categories', component: CategoriesComponent },
            { path: 'types', component: MenuTypesComponent },
            { path: 'business-types', component: BusinessTypesComponent },
            { path: 'document-types', component: DocumentTypeComponent },






        ]
    }
]



// export default [


//     {path:'',component: LayoutComponent,
//         children:[
//             { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

//             { path: 'dashboard', Component: DashboardComponent },
//         ]
//     }
// ]
