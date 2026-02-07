import { Component, inject, signal } from '@angular/core';
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { DateFilterComponent } from "@/components/date-filter/date-filter.component";
import { FilterComponent } from "@/components/filter";
import { TableModule } from "primeng/table";
import { Tag } from "primeng/tag";
import { Dialog } from "primeng/dialog";
import { Checkbox } from "primeng/checkbox";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from "primeng/dropdown";
import { CountryService } from 'src/core/services/country.service';
import { DefaultItem, LgasList } from '@/types/blog';

@Component({
    selector: 'app-local-government',
    imports: [IconField, ReactiveFormsModule, ButtonModule, InputTextModule, InputIcon, DateFilterComponent, FilterComponent, TableModule,  Dialog,  DropdownModule],
    templateUrl: './local-government.component.html',
    styleUrl: './local-government.component.scss'
})
export class LocalGovernmentComponent {
    private readonly countryService = inject(CountryService);
    lgaForm: FormGroup
    showDialog: boolean = false;
    protected country = signal<DefaultItem[]>([])
    protected states = signal<DefaultItem[]>([])
    protected lgas = signal<DefaultItem[]>([])
    localGovList = signal<LgasList[]>([])
    constructor(fb: FormBuilder,) {
        this.lgaForm = fb.group({
            id: [0],
            name: ['', Validators.required],
            parentId: [0]
        })
        this.getCountry();
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
        this.countryService.getAllLocalGov(stateId).subscribe({
            next: ((resp: any) => {
                console.log(resp.result.data);

                if (resp.result.responseCode == 0) {
                    this.localGovList.set(resp.result.data)
                }
            }),
            error(err: any) {
                console.log(err);
            },
        })
    }

    // getActiveStatus(arg0: any): string | undefined {
    //    // throw new Error('Method not implemented.');
    // }
    openDetails(item: any) {
        this.showDialog = true;
    }

    cancel() {
        this.showDialog = false;
    }
    save() {

    }
    updateDetails(item: any) {
        this.showDialog = true;
    }

    addLocalGov() {
        this.showDialog = true;
    }

}
