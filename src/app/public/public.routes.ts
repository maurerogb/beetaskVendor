import { Routes } from '@angular/router';
import { OnboardComponent } from './vendors/onboard/onboard.component';

export default [
    {
        path: '',
        component: OnboardComponent,
        loadChildren: () => import('@/public/admin/admin.routes')
    },
    // {path:'registration', loadComponent:()=> import('./vendor-registration/vendor-registration.component').then((c)=> c.VendorRegistrationComponent)},

    //  loadComponent: () => import('./vendors/onboard/onboard.component').then((c) => c.OnboardComponent) },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
