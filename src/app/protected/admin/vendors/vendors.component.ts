import { Component, inject, signal } from '@angular/core';
import { EmptyVendorComponent } from "@/components/empty-vendor";
import { TableModule } from "primeng/table";
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { FilterComponent, Filter } from "@/components/filter";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { ImageModule } from 'primeng/image';
import { InputTextModule } from 'primeng/inputtext';
import { VendorService } from 'src/core/services/vendor.service';
import { CommonTypes, RequestStatus, VendorApprovalRequest, VendorDetails } from '@/types/user';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TagModule } from "primeng/tag";
import { Dialog } from "primeng/dialog";
import { ButtonModule } from 'primeng/button';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "primeng/tabs";
import { NoteComponent } from "@/components/note";
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { SortComponent } from "@/components/sort";
import { Divider } from "primeng/divider";
import { CancelComponent } from "@/components/cancel";
import { AccountService } from 'src/core/services/account.service';
import { ProductService } from 'src/core/services/product.service';
import { Product } from '@/types/product';
import { ToggleSwitchModule } from "primeng/toggleswitch";
import { Select } from "primeng/select";
import { CountryService } from 'src/core/services/country.service';
import { DefaultItem } from '@/types/blog';
import { FileUploadComponent } from '@/components/fileupload/fileupload.component';
import { strictEmail } from 'src/pipes/email';
import { FlagComponent } from "@/components/svg-icon/flag";
import { PopoverModule } from "primeng/popover";
import { TrashComponent } from "@/components/svg-icon/trash";
import { PromoComponent } from "@/components/svg-icon/promo";
import { PhoneAutoFormatDirective } from "src/core/directives/phone-auto-format.directive";
import { VendorMenuComponent } from "@/protected/components/vendor-menu/vendor-menu.component";

@Component({
    selector: 'app-vendors',
    imports: [RatingModule, FormsModule, TagModule, ButtonModule, EmptyVendorComponent,
        ScrollPanelModule, PopoverModule, CommonModule, InputTextModule, TableModule, DateFilterComponent, FilterComponent,
        IconField, InputIcon, Dialog, Tabs, TabList, Tab, TabPanels, TabPanel, NoteComponent, SortComponent,
        Divider, Filter, CancelComponent, ToggleSwitchModule, Select, ReactiveFormsModule, FileUploadComponent,
        FlagComponent, TrashComponent, PromoComponent,
        ImageModule, PhoneAutoFormatDirective, VendorMenuComponent],
    templateUrl: './vendors.component.html',
    styleUrl: './vendors.component.scss'
})
export class VendorsComponent {
    businessData = signal<CommonTypes[]>([]);
    vendorData = signal<VendorDetails[]>([]);

    country = signal<DefaultItem[]>([]);
    protected states = signal<DefaultItem[]>([])
    protected lgas = signal<DefaultItem[]>([])
    protected cities = signal<DefaultItem[]>([])

    vendorForm: FormGroup | undefined;
    showVendorMenuForm: boolean = false;
    showDialog: boolean = false;
    showVendorForm: boolean = false;
    productData = signal<Product[] | null>([]);
    selectedVendor = signal<VendorDetails | undefined>(undefined);
    protected readonly vendorService = inject(VendorService);
    protected readonly accountService = inject(AccountService);
    protected readonly productService = inject(ProductService);
    protected readonly countryService = inject(CountryService);

    displayPicture: File | null = null;
    logo: File | null = null;
    cacCert: File | null = null;
    fhCert: File | null = null;

    protected readonly fb = inject(FormBuilder);
    profileDetails = signal<any>({});
    constructor() {
        this.initiateForm();
        this.getAllVendors();
    }
    statuses = ['All', 'Open', 'In Review', 'Resolved'];

    activeIndex = signal(0);

    private getAllVendors() {
        this.vendorService.getAllVendors().subscribe({
            next: ((resp: any) => {
                console.log(resp.data);

                if (resp.responseCode == 0) {
                    this.vendorData.set(resp.data);
                }
            }),
            error(err) {
                console.log(err);
            },
        });
    }
    openMenu() {
        this.showVendorMenuForm = true;
    }
    select(index: number) {
        this.activeIndex.set(index);
    }

    selectVendor(item: any) {
        this.selectedVendor.set(item.businessName)
    }
    initiateForm() {
        this.vendorForm = this.fb.group({
            businessName: ['', Validators.required],
            businessType: ['', Validators.required],
            emailBusiness: ['', [Validators.required, strictEmail]],
            businessPhoneNumber: ['', Validators.required],
            country: ['', Validators.required],
            state: ['', Validators.required],
            city: ['', Validators.required],
            lga: ['', Validators.required],
            address: ['', Validators.required],
            // cacCertificate: ['', Validators.required],
            // fhCertificate: ['', Validators.required],
            // logo: ['', Validators.required],
            // displayPicture: ['', Validators.required],

            ownerFullName: ['', Validators.required],
            ownerEmail: ['', [Validators.required, strictEmail]],
            ownerPhoneNumber: ['', Validators.required],
            userName: ['', Validators.required],
        })
    }
    deleteVendor(vendor: any) {
        console.log('deleting vendor', vendor.vendorId);
    }

    suspendVendor(vendor: any) {
        console.log('suspending vendor', vendor.vendorId);
    }

    flagVendor(vendor: any) {
        console.log('flagging vendor', vendor.vendorId);
    }
    submit() {
        const formData = new FormData();
        const form = this.vendorForm?.value;
        const cityName = this.cities().find(x => x.id == form.city)?.name;
        const lgaName = this.lgas().find(x => x.id == form.lga)?.name;
        const stateName = this.states().find(x => x.id == form.state)?.name;
        const countryName = this.country().find(x => x.id == form.country)?.name;

        console.log(form);

        const uuid = this.accountService.currentUser()?.data.uuId
        formData.append('BusinessName', form.businessName)
        formData.append('BusinessAddress', form.address)
        formData.append('PhoneNumber', form.businessPhoneNumber)
        formData.append('City', cityName!)
        formData.append('LocalGovArea', lgaName!)
        formData.append('RegionOrState', stateName!)
        formData.append('Country', countryName!)
        formData.append('UUID', uuid!);
        formData.append('BusinessTypeId', form.businessType);
        formData.append('Email', form.emailBusiness);
        formData.append('OwnerFullName', form.ownerFullName);
        formData.append('OwnerEmail', form.ownerEmail);
        formData.append('OwnerPhoneNumber', form.ownerPhoneNumber);
        formData.append('UserName', form.userName);

        if (this.cacCert) {
            formData.append('CACCertificate', this.cacCert)
        }
        if (this.logo) {
            formData.append('BusinessLogo', this.logo)
        }
        if (this.displayPicture) {
            formData.append('DisplayPicture', this.displayPicture)
        }
        if (this.fhCert) {
            formData.append('FHCertificate', this.fhCert)
        }
        this.accountService.registerVendor(formData).subscribe({
            next: (resp: any) => {
                console.log(resp.data);
                if (resp.responseCode == 0) {
                    this.vendorData.set(resp.data)
                    this.showVendorForm = false;
                }

            },
            error(err) {
                console.log(err);
            },
        })
    }

    onFHLicenseUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.fhCert = fileInput.files[0];
        }
        console.log(this.fhCert?.name);
    }

    toggleProduct(product: Product) {
        this.productService.toggleProductAvailabity(product.productId, product.instock).subscribe({
            next: resp => {

            }
        })
    }
    getSeverity(status: number) {
        switch (status) {
            case 0:
                return 'info';
            case 1:
                return 'warn';
            case 2:
                return 'danger';
            case 3:
                return 'success';
            case 4:
                return 'secondary';
            default:
                return;
        }
    }
    setSelectedVendor(item: VendorDetails) {
        console.log('VendorDetails => ', item);

        this.selectedVendor.set(item)
        this.showDialog = true
        this.productService.getProduct(item.uuid).subscribe({
            next: ((resp: any) => {
                console.log(resp.data.data);
                this.productData.set(resp.data.data)
            }),
            error(err) {
                console.log(err);
            },
        });

        this.accountService.getProfile(item.uuid).subscribe({
            next: ((resp: any) => {
                console.log(resp.data);
                if (resp.reponseCode == 0) {
                    this.profileDetails.set(resp.data)
                }
            }),
            error(err) {
                console.log(err);
            }
        });
    }
    getStatus(index: number) {
        const values = Object.values(RequestStatus);
        return values[index] ?? null;
    }

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
    getStates(id: any) {
        this.countryService.getStates(id).subscribe({
            next: ((resp: any) => {

                if (resp.result.responseCode == 0) {
                    this.states.set(resp.result.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        })
    }
    onLogoUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.logo = fileInput.files[0];
        }
        console.log(this.logo?.name);
    }

    onCacCertUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.cacCert = fileInput.files[0];
        }
        console.log(this.cacCert?.name);
    }
    onDisplayPictureUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.displayPicture = fileInput.files[0];
        }
        console.log(this.displayPicture?.name);
    }


    rejectVendor(Item: VendorDetails) {
        const data: VendorApprovalRequest = {
            businessName: Item.businessName,
            uuid: Item.uuid
        }
        this.vendorService.rejectVendorRequest(Item.vendorId, data).subscribe({
            next: ((resp: any) => {
                console.log(resp.data);

                if (resp.responseCode == 0) {
                    this.vendorData.set(resp.data)
                    this.showDialog = false;
                }
            }),
            error(err) {
                console.log(err);
            },
        })
    }

    acceptRequest(Item: VendorDetails) {

        const data: VendorApprovalRequest = {
            businessName: Item.businessName,
            uuid: Item.uuid
        }
        this.vendorService.acceptVendorRequest(Item.vendorId, data).subscribe({
            next: ((resp: any) => {
                console.log(resp.data);

                if (resp.responseCode == 0) {
                    //this.vendorData.set(resp.data)
                    this.showDialog = false;
                }
            }),
            error(err) {
                console.log(err);
            },
        })
    }

    openDetails() {
        this.showDialog = true
    }
    openVendorForm() {
        this.showVendorForm = true
        this.getBusinessTypes();
        this.getCountryList();
    }

    private getBusinessTypes() {
        this.vendorService.getBusinessTypes().subscribe({
            next: ((resp: any) => {
                console.log('business data', resp.data);
                if (resp.responseCode == 0) {
                    this.businessData.set(resp.data);
                }
            }),
            error(err) {
                console.log(err);
            },
        });
    }

    getCountryList() {
        this.countryService.getCountries().subscribe({
            next: ((resp: any) => {
                console.log('country data', resp.data);
                if (resp.result.responseCode == 0) {
                    this.country.set(resp.result.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        });
    }

    closeVendorForm() {
        this.showVendorForm = false
        this.vendorForm?.reset();
        this.cacCert = null;
        this.fhCert = null;
        this.logo = null;
        this.displayPicture = null;
        this.getAllVendors();
    }
    closeDetails() {
        this.showDialog = false
    }

    menuItems = [
        { key: 'vendor-info', label: 'Business Information' },
        { key: 'performance', label: 'Performance' },
        { key: 'payouts', label: 'Payouts' },
        { key: 'menu', label: 'Menu' }
    ];
}
