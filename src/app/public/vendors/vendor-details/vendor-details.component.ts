
import { Component, inject, OnInit, signal } from '@angular/core';
import { LogoComponent } from "@/public/component/logo/logo.component";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { DefaultItem } from '@/types/blog';
import { CountryService } from '../../../../core/services/country.service';
import { SelectModule } from 'primeng/select';
import { AccountService } from 'src/core/services/account.service';
import { VendorService } from 'src/core/services/vendor.service';
import { RegistrationBannerComponent } from "../vendor-registration/registration-banner/registration-banner.component";

@Component({
    selector: 'app-vendor-details',
    imports: [ReactiveFormsModule, RippleModule, SelectModule,
        InputTextModule, ButtonModule, RegistrationBannerComponent],
    templateUrl: './vendor-details.component.html',
    styleUrl: './vendor-details.component.scss'
})
export class VendorDetailsComponent implements OnInit {

    private readonly countryService = inject(CountryService);
    protected readonly accountService = inject(AccountService);
    protected readonly vendorService = inject(VendorService);
    vendorDetailsForm: FormGroup
    protected states = signal<DefaultItem[]>([])
    protected lgas = signal<DefaultItem[]>([])
    protected cities = signal<DefaultItem[]>([])
    protected businessTypes = signal<any[]>([])

    licenseFile: File | null = null;
    logoFile: File | null = null;


    getCities(id: number) {
        console.log('lgaid', id);

        this.countryService.getCities(id).subscribe({
            next: ((resp: any) => {
                if (resp.result.responseCode == 0) {
                    console.log(resp.result.data);
                    this.cities.set(resp.result.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        })

    }
    getlga(id: number) {
        this.countryService.getLGA(id).subscribe({
            next: ((resp: any) => {
                if (resp.result.responseCode == 0) {
                    console.log(resp.result.data);
                    this.lgas.set(resp.result.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        })

    }
    getStates() {
        this.countryService.getStates().subscribe({
            next: ((resp: any) => {
                // console.log(resp);
                if (resp.result.responseCode == 0) {
                    this.states.set(resp.result.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        })
    }

    getBusiness() {
        this.vendorService.getBusinessTypes().subscribe({
            next: (resp => {
                if (resp.responseCode == 0) {
                    this.businessTypes.set(resp.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        })
    }

    submitDetails() {
        const formData = new FormData();
        const form = this.vendorDetailsForm.value


        const cityName = this.cities().find(x => x.id == form.cityName)?.name;
        const lgaName = this.lgas().find(x => x.id == form.lgaName)?.name;
        const stateName = this.states().find(x => x.id == form.stateName)?.name;

        console.log(cityName);

        const uuid = this.accountService.currentUser()?.data.uuId
        formData.append('BusinessName', form.restaurantName)
        formData.append('BusinessAddress', form.businessAddress)
        formData.append('PhoneNumber', form.phoneNumber)
        formData.append('City', cityName!)
        formData.append('LocalGovArea', lgaName!)
        formData.append('RegionOrState', stateName!)
        formData.append('Country', 'Nigeria')
        formData.append('UUID', uuid!);
        formData.append('BusinessTypeId', form.businessTypeId);

        if (this.licenseFile) {
            formData.append('CACCertificate', this.licenseFile)
        }
        if (this.logoFile) {
            formData.append('BusinessLogo', this.logoFile)
        }

        this.vendorService.addVendor(formData).subscribe({
            next: res => {
                console.log(res);
                if (res.responseCode == 0) {
                    this.router.navigate(['/vendor/onboarding/vendor-reg-complete']);
                }
                else {
                    console.log('Error, ==> ', res.description);
                }
            }
            // error: console.error();

        })
    }

    onLicenseSelected(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.licenseFile = fileInput.files[0];
        }
        console.log(this.licenseFile?.name);
    }

    onLogoSelected(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.logoFile = fileInput.files[0];
        }
        console.log(this.logoFile?.name);
    }
    constructor(private fb: FormBuilder, private readonly router: Router) {
        this.vendorDetailsForm = this.fb.group({
            restaurantName: ['', [Validators.required]],
            businessAddress: ['', [Validators.required]],
            phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,4})?\s?\d{9,10}$/)]],
            stateName: ['', [Validators.required]],
            cityName: ['', [Validators.required]],
            lgaName: ['', [Validators.required]],
            businessTypeId: ['', [Validators.required]]
        })
    }
    ngOnInit(): void {
        this.getStates();
        this.getBusiness();
        this.accountService.getcurrentUser();

    }
}
