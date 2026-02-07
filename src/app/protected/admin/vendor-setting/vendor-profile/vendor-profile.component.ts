import { Component, inject, OnInit, signal } from '@angular/core';
import { VendorUpload } from "@/layout/components/vendor.upload";
import { Checkbox } from "primeng/checkbox";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, ɵInternalFormsSharedModule } from '@angular/forms';
import { AccountService } from 'src/core/services/account.service';
import { VendorService } from 'src/core/services/vendor.service';

@Component({
    selector: 'app-vendor-profile',
    imports: [VendorUpload, Checkbox, ɵInternalFormsSharedModule, ReactiveFormsModule],
    templateUrl: './vendor-profile.component.html',
    styleUrl: './vendor-profile.component.scss'
})
export class VendorProfileComponent implements OnInit {

    businessForm: FormGroup | null;
    profileForm: FormGroup | null;
    busiDocumentsForm: FormGroup | null;
    vendorService = inject(VendorService)
    accountService = inject(AccountService)
    logoString = signal<string>('');
    cACRegistrationUrl = signal<string>('');
    foodHandlingPermitUrl = signal<string>('');

    constructor(private fb: FormBuilder) {
        this.businessForm = this.fb.group({
            businessName: ['', Validators.required],
            CuisineType: ['', [Validators.required]],
            businessPhone: ['', Validators.required],
            restaurantBio: ['', Validators.required],
            businessLogo: ['', Validators.required]
        });

        this.profileForm = this.fb.group({
            fullName: ['', Validators.required],
            phoneNumber: ['', [Validators.required]],
            emailAddress: ['', Validators.required]
        });
        this.busiDocumentsForm = this.fb.group({
            isCacCertificateValified: [false, Validators.required],
            isFoodHandlingPermitValified: [false, Validators.required],
            isBankAccountValified: [false, Validators.required],
            cACRegistrationUrl: ['', Validators.required],
            foodHandlingPermitUrl: ['', Validators.required]
        });
    }
    ngOnInit(): void {

        this.getProfileData();
        this.getBusinessData();
    }

    OnInit(): void {

    }


    getProfileData() {
        this.accountService.getcurrentUser();
        const personalDetails = this.accountService.currentUser();
        console.log(personalDetails);

        this.profileForm?.patchValue({
            fullName: personalDetails?.data.fullName,
            phoneNumber: personalDetails?.data.phoneNumber.substring(3),
            emailAddress: personalDetails?.data.email
        });
    }
    getBusinessData() {
        this.vendorService.getVendorInfo();
        const vendorDetails = this.vendorService.vendorinfo();
        console.log('vendorDetails', vendorDetails);
        this.logoString.set(vendorDetails[0]?.businessLogo);
        this.businessForm?.patchValue({
            businessName: vendorDetails[0]?.businessName,
            CuisineType: vendorDetails[0]?.CuisineType,
            businessPhone: vendorDetails[0]?.phoneNumber.substring(1),
            restaurantBio: vendorDetails[0]?.RestaurantBio,
        });
        this.cACRegistrationUrl.set(vendorDetails[0]?.cacCertificate);
        this.foodHandlingPermitUrl.set(vendorDetails[0]?.cacCertificate);
        this.busiDocumentsForm?.patchValue({
            isCacCertificateValified: vendorDetails[0]?.cacCertificate.length > 0 ? true : false,
            isFoodHandlingPermitValified: false,
            isBankAccountValified: false,
            cACRegistrationUrl: vendorDetails[0]?.cacCertificate,
            foodHandlingPermitUrl: ''
        });
    }

uploadFile(event: any){
    const file = event.target.files[0];
    console.log('file', file.name);
}

}
