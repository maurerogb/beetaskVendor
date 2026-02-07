import { Component, signal, inject } from '@angular/core';
import { RiderComponent } from "@/components/rider";
import { TableModule } from "primeng/table";
import { FilterComponent, Filter } from "@/components/filter";
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { InputIcon } from "primeng/inputicon";
import { IconField } from "primeng/iconfield";
import { InputTextModule } from 'primeng/inputtext';
import { RiderSkechComponent } from "@/components/svg-icon/rider-skech";
import { Dialog } from "primeng/dialog";
import { CancelComponent } from "@/components/cancel";
import { TagModule } from "primeng/tag";
import { CommonModule } from '@angular/common';
import { RequestStatus } from '@/types/user';
import { PopoverModule } from "primeng/popover";
import { FlagComponent } from "@/components/svg-icon/flag";
import { TrashComponent } from "@/components/svg-icon/trash";
import { TabsModule } from 'primeng/tabs';
import { ScrollPanelModule } from "primeng/scrollpanel";
import { NoteComponent } from "@/components/note";
import { SortComponent } from "@/components/sort";
import { DividerModule } from "primeng/divider";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadComponent } from "@/components/fileupload/fileupload.component";
import { VendorService } from 'src/core/services/vendor.service';
import { AccountService } from 'src/core/services/account.service';
import { DefaultItem } from '@/types/blog';
import { CountryService } from 'src/core/services/country.service';
import { SelectModule } from 'primeng/select';
import { DocumentService } from 'src/core/services/document.service';
import { NumberlimiterDirective } from 'src/core/directives/numberlimiter.directive';
import { PhoneAutoFormatDirective } from 'src/core/directives/phone-auto-format.directive';
import { RiderService } from 'src/core/services/rider.service';
import { ButtonModule } from 'primeng/button';
import { OverlayBadge } from "primeng/overlaybadge";
import { PhoneFormaterPipe } from "../../../../pipes/phone-formater.pipe";
import { formatDate } from 'src/utils/date-utils';
import { OrdinalDatePipe } from "../../../../pipes/ordinal-date.pipe";
import { FilterSortComponent } from "@/components/filter-sort/filter-sort.component";

@Component({
    selector: 'app-riders',
    imports: [RiderComponent, CommonModule, InputTextModule, TableModule, FilterComponent, DateFilterComponent, InputIcon,
        IconField, Dialog, CancelComponent, TagModule, PopoverModule, ButtonModule,
        NumberlimiterDirective, ReactiveFormsModule, TabsModule, ScrollPanelModule, DividerModule,
        PhoneAutoFormatDirective, RiderSkechComponent, FileUploadComponent, SelectModule, OverlayBadge,
        PhoneFormaterPipe, NoteComponent, OrdinalDatePipe, FilterSortComponent],
    templateUrl: './riders.component.html',
    styleUrl: './riders.component.scss'
})
export class RidersComponent {
    riderData = signal<any[]>([])
    profileDetails = signal<any | null>(null);
    selectedRider = signal<any | null>(null);
    document = signal<any[]>([]);
    showDialog: boolean = false;
    showRiderForm: boolean = false;
    riderForm: FormGroup | undefined;
    statuses = ['All', 'Open', 'In Review', 'Resolved'];
    readonly fb = inject(FormBuilder);
    activeIndex = signal(0);

    documentCert: File | null = null;
    riderPicture: File | null = null;
    licenseCert: File | null = null;
    insureanceCert: File | null = null;
    bikePicture: File | null = null;

    protected readonly documentService = inject(DocumentService);
    protected readonly vendorService = inject(VendorService);
    protected readonly accountService = inject(AccountService);
    protected readonly countryService = inject(CountryService);
    protected readonly riderService = inject(RiderService);

    country = signal<DefaultItem[]>([]);
    protected states = signal<DefaultItem[]>([])
    protected lgas = signal<DefaultItem[]>([])
    protected cities = signal<DefaultItem[]>([])
    protected nextDate = signal<any>({})

    constructor() {
        this.riderForm = this.fb.group({
            fullName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phoneNumber: ['', Validators.required],
            userName: ['', Validators.required],

            region: ['', Validators.required],
            lga: ['', Validators.required],
            city: ['', Validators.required],
            address: ['', Validators.required],

            bankName: ['', Validators.required],
            accountNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(13)]],
            accountName: ['', Validators.required],

            documentType: ['', Validators.required],
            documentNumber: ['', Validators.required],

            vehicleType: [''],
            vehicleName: [''],
            plateNumber: [''],

        });
        this.getRiders();
        let date = new Date()
        const fdate = formatDate(date)
        this.nextDate.set(fdate)
    }

    openDetails(item: any) {
        this.showDialog = true;
        console.log('Rider ', item);
        this.selectedRider.set(item);
    }

    getDocumentTypes() {
        this.documentService.getDocument().subscribe({
            next: ((resp: any) => {
                if (resp.responseCode == 0) {
                    this.document.set(resp.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        })
    }

    select(index: number) {
        this.activeIndex.set(index);
    }
    submitRiderForm() {
        if (this.riderForm?.valid) {
            const newRider = this.riderForm.value;
            console.log('Rider Data:', newRider);

            const cityName = this.cities().find(x => x.id == newRider.city)?.name;
            const lgaName = this.lgas().find(x => x.id == newRider.lga)?.name;
            const stateName = this.states().find(x => x.id == newRider.region)?.name;

            const formData = new FormData();
            formData.append('FullName', newRider.fullName);
            formData.append('EmailAddress', newRider.email);
            formData.append('PhoneNumber', newRider.phoneNumber);
            formData.append('UserName', newRider.userName);

            formData.append('State', stateName || '');
            formData.append('LGA', lgaName || '');
            formData.append('City', cityName || '');
            formData.append('RiderAddress', newRider.address);

            formData.append('BankName', newRider.bankName);
            formData.append('AccountNumber', newRider.accountNumber);
            formData.append('AccountName', newRider.accountName);

            formData.append('DocumentTypeId', newRider.documentType);
            formData.append('DocumentNumber', newRider.documentNumber);

            formData.append('VehicleType', newRider.vehicleType);
            formData.append('VehicleName', newRider.vehicleName);
            formData.append('PlateNumber', newRider.plateNumber);

            if (this.documentCert) {
                formData.append('DocumentFile', this.documentCert)
            }
            if (this.licenseCert) {
                formData.append('LicenseFile', this.licenseCert)
            }
            if (this.bikePicture) {
                formData.append('VehicleImgFile', this.bikePicture)
            }
            if (this.riderPicture) {
                formData.append('RiderImgFile', this.riderPicture)
            }
            if (this.insureanceCert) {
                formData.append('InsuranceFile', this.insureanceCert)
            }

            this.accountService.registerRider(formData).subscribe({
                next: (resp: any) => {
                    console.log('Rider registered successfully:', resp);
                    this.showRiderForm = false;
                    this.riderForm!.reset();
                }
            })
        }
    }

    getRiders() {
        this.riderService.getAllRiders().subscribe({
            next: ((resp: any) => {
                console.log(resp.data);

                if (resp.responseCode == 0) {
                    this.riderData.set(resp.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        })
    }


    acceptRequest(rider: any) { }
    suspendRider(rider: any) { }
    deleteVendor(rider: any) { }
    rejectRider(rider: any) { }
    deleteRider(rider: any) { }
    flagRider(rider: any) { }



    onDocumentUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.documentCert = fileInput.files[0];
        }
        console.log(this.documentCert?.name);
    }

    onLicenseUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.licenseCert = fileInput.files[0];
        }
        console.log(this.licenseCert?.name);
    }


    onBikeUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.bikePicture = fileInput.files[0];
        }
        console.log(this.bikePicture?.name);
    }

    onRiderUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.riderPicture = fileInput.files[0];
        }
        console.log(this.riderPicture?.name);
    }

    onInsureanceUpload(event: Event) {
        const fileInput = event.target as HTMLInputElement;
        if (fileInput.files && fileInput.files.length > 0) {
            this.insureanceCert = fileInput.files[0];
        }
        console.log(this.insureanceCert?.name);
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
        console.log('stateid', id);
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
        this.countryService.getStates(1).subscribe({
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

    closeFormDetails() {
        this.showRiderForm = false;
    }

    closeDetails() {
        this.showDialog = false;
    }
    showForm() {
        this.showRiderForm = true;
        this.getStates();
        this.getDocumentTypes();
    }

    openCreateDialog() {
        this.showDialog = true;
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

    getStatus(index: number) {
        console.log(index);

        const values = Object.values(RequestStatus);
        console.log(values[index]);

        return values[index] ?? null;
    }
}
