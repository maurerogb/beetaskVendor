import { Routes } from '@angular/router';



export default [

    {
        path: '',
        children: [
            { path: '', loadComponent: () => import('./login/login.component').then((c) => c.LoginComponent) },

        ]
    }

] as Routes;
