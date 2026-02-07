
import { AdminUsersComponent } from "./admin-users/admin-users.component";
import { CustomerComponent } from "./customer/customer.component";
import { ManagerComponent } from "./manager";

export default [
    {
        path: '', Component:ManagerComponent,
        children: [
            { path: '', redirectTo: 'admin-user', pathMatch: 'full' },
            {path:'admin-user', component: AdminUsersComponent },
            { path: 'customers', component: CustomerComponent },
        ]
    }]
