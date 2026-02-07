import { Routes } from '@angular/router';
//import { LayoutComponent } from './vendor/layout/layout.component';

export default [

    {
        path: '',
        children:[
            { path: '' , loadChildren:()=>import('./admin/admin.routes')},
            ]
    },

    //  loadComponent: () => import('./vendors/onboard/onboard.component').then((c) => c.OnboardComponent) },
] as Routes;
