import { inject, Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { CommonState, CountryRes, LgasList } from '@/types/blog';

@Injectable({
    providedIn: 'root'
})
export class CountryService {
    http = inject(BaseService);
    urlPrefix = 'Country/'

    getCountries() {
        return this.http.get<CountryRes>(`${this.urlPrefix}GetCountries`)
    }

    getStates(id: number) {
        return this.http.get<CountryRes>(`${this.urlPrefix}GetStatesByCountryId/${id}`)
    }

    getLGA(stateid: number) {
        return this.http.get<CountryRes>(`${this.urlPrefix}GetLocalGovornmentByStateId/${stateid}`)
    }
    getCities(lgaId: number) {
        return this.http.get<CountryRes>(`${this.urlPrefix}GetCitiesByLGId/${lgaId}`)
    }

    getAllLocalGov(id: number) {
        return this.http.get<LgasList>(`${this.urlPrefix}GetAllLGA/${id}`)
    }

    getAllCities(lgaId: number) {
        return this.http.get<CountryRes>(`${this.urlPrefix}GetAllCities/${lgaId}`)
    }

    addCities(data: CommonState) {
        return this.http.post<CountryRes>(`${this.urlPrefix}CreateCities`,data)
    }
}
