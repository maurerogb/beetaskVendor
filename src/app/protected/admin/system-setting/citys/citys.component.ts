import { DateFilterComponent } from '@/components/date-filter/date-filter.component';
import { FilterComponent } from '@/components/filter';
import { CityList, CommonState, DefaultItem, LgasList } from '@/types/blog';
import { Component, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { CountryService } from 'src/core/services/country.service';
import { CancelComponent } from "@/components/cancel";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-citys',
    imports: [IconField, ReactiveFormsModule, ButtonModule, InputTextModule,
        InputIcon, DateFilterComponent, FilterComponent, TableModule, Dialog,
        DropdownModule, CancelComponent, CommonModule],

    templateUrl: './citys.component.html',
    styleUrl: './citys.component.scss'
})
export class CitysComponent {
    private readonly countryService = inject(CountryService);
    cityForm: FormGroup
    showDialog: boolean = false;
    protected country = signal<DefaultItem[]>([])
    protected states = signal<DefaultItem[]>([])
    protected lgas = signal<DefaultItem[]>([])
    CityList = signal<CityList[]>([])
    newRecord: boolean = false;

    constructor(fb: FormBuilder,) {
        this.cityForm = fb.group({
            id: [0],
            name: ['', Validators.required],
            lgaId: [0]
        })
        this.getCountry();
    }

    closeFormDetails() {
        this.showDialog = false
    }
    getCountry() {
        this.countryService.getCountries().subscribe({
            next: ((resp: any) => {
                if (resp.result.responseCode == 0) {
                    this.country.set(resp.result.data)
                }
            }),
            error(err: any) {
                console.log(err);
            },
        });
    }

    getStates(ctyId: number) {
        this.countryService.getStates(ctyId).subscribe({
            next: ((resp: any) => {
                if (resp.result.responseCode == 0) {
                    this.states.set(resp.result.data)
                }
            }),
            error(err: any) {
                console.log(err);
            },
        })
    }

    getLgaState(stateId: number) {
        this.countryService.getLGA(stateId).subscribe({
            next: ((resp: any) => {
                console.log(resp.result.data);

                if (resp.result.responseCode == 0) {
                    this.lgas.set(resp.result.data)
                }
            }),
            error(err: any) {
                console.log(err);
            },
        })
    }
    getCityList(stateId: number) {
        this.countryService.getAllCities(stateId).subscribe({
            next: ((resp: any) => {
                console.log(resp.result.data);

                if (resp.result.responseCode == 0) {
                    this.CityList.set(resp.result.data)
                }
            }),
            error(err: any) {
                console.log(err);
            },
        })
    }

    openDetails(item: any) {
        this.showDialog = true;
    }

    cancel() {
        this.showDialog = false;
    }
    save() {
        const form = this.cityForm.value;
        const data: CommonState = {
            name: form.name,
            id: form.id,
            parentId: form.lgaId
        }
        console.log(data);

        this.countryService.addCities(data).subscribe({
            next: ((resp: any) => {
                if (resp.responseCode == 0) {
                    this.newRecord = true
                    this.showDialog = false
                }
            }),
            error(err: any) {
                console.log(err);
            },
        })
    }

    updateDetails(item: any) {
        this.showDialog = true;
        console.log(item);
        this.newRecord = false;

        this.cityForm.patchValue({
            id: item.cityId,
            name: item?.city,
            lgaId: item.lgaId
        })
    }

    addLocalGov() {
        this.showDialog = true;
        this.newRecord = true
    }
}
