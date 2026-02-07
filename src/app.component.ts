import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';
import { LoaderComponent } from "@/components/loader/loader.component";
import { Toast } from "primeng/toast";

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, LoaderComponent, Toast],
    template: `<p-toast></p-toast><app-loader></app-loader> <router-outlet></router-outlet>`
})
export class AppComponent {
constructor(private router: Router) {
    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(event => {
        console.log('Navigation ended to:', (event as NavigationEnd).urlAfterRedirects);
    });
}
}
