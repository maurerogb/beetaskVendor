import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';



export default [

    {
        path: '',
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', loadComponent: () => import('./vendor-login/vendor-login.component').then((c) => c.VendorLoginComponent) },
            { path: 'registration', loadComponent: () => import('./vendor-registration/vendor-registration.component').then((c) => c.VendorRegistrationComponent) },
            { path: 'verify-phone-number', loadComponent: () => import('./verify-phonenumber/verify-phonenumber.component').then((c) => c.VerifyPhonenumberComponent) },
            { path: 'vendor-details', loadComponent: () => import('./vendor-details/vendor-details.component').then((c) => c.VendorDetailsComponent) },
            { path: 'vendor-reg-complete', loadComponent: () => import('./vendor-signup-end/vendor-signup-end.component').then((c) => c.VendorSignupEndComponent) },

            { path: 'forgot-password', loadComponent: () => import('./forgot-password/forgot-password.component').then((c) => c.ForgotPasswordComponent) },

        ]
    }

] as Routes;
