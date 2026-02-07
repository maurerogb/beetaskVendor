import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [

    {
        path: '',
        children: [
            { path: '', redirectTo: '/login', pathMatch: 'full' },
            {
                path: 'login',
                data: { breadcrumb: 'Admin' },
                loadChildren: () => import('@/public/public.routes')
            },
        ]
    },
    {path:'admin', canActivate: [authGuard], loadChildren:()=> import('@/protected/protected.routes') },
    { path: '**', redirectTo: 'login' }
];
