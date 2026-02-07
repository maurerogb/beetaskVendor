import { Injectable } from '@angular/core';
import  {IconCentralRegistry} from'./svg-central-registry.service';

@Injectable({
    providedIn: 'root'
})
export class SvgIconRegistryService {
    constructor(private readonly iconCentral: IconCentralRegistry) { }

    getIcon(name: string): string | undefined {
        return this.iconCentral.getIcon(name);
    }
}
