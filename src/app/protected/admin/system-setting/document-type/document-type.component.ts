import { DocumentService } from './../../../../../core/services/document.service';
import { DateFilterComponent } from '@/components/date-filter/date-filter.component';
import { FilterComponent } from '@/components/filter';
import { CommonTypes } from '@/types/user';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Checkbox } from 'primeng/checkbox';
import { Dialog } from 'primeng/dialog';
import { IconField } from 'primeng/iconfield';
import { InputIcon } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { Tag } from 'primeng/tag';
import { CancelComponent } from "@/components/cancel";

@Component({
    selector: 'app-document-type',
    imports: [IconField, CommonModule, ReactiveFormsModule, ButtonModule,
        InputTextModule, InputIcon, DateFilterComponent, FilterComponent,
        TableModule, Dialog, Tag, Checkbox, CancelComponent],

    templateUrl: './document-type.component.html',
    styleUrl: './document-type.component.scss'
})
export class DocumentTypeComponent {
    showDialog: boolean = false;
    document = signal<CommonTypes[]>([])
    btForm: FormGroup | null;
    protected readonly documentService = inject(DocumentService);

    constructor(fb: FormBuilder) {
        this.btForm = fb.group({
            id: [0],
            documentTypeName: ['', Validators.required],
            description: [''],
            isActive: [false]
        });
        this.getBusiness();
    }

    addDocumentTypes() {
        this.showDialog = true
    }
    openDetails(item: any) {
        this.showDialog = true
        console.log(`documents`, item);

        this.btForm?.patchValue({
            id: item.id,
            documentTypeName: item.name,
            description: item.description,
            isActive: item.isActive
        })
    }
    save() {
        const form = this.btForm?.value;
        const data: any = {
            id: form.id,
            DocumentName: form.documentTypeName,
            description: form.description,
            isActive: form.isActive
        };
        console.log(data);

        if (data.id == 0) {
            this.documentService.addDocument(data).subscribe({
                next: (resp => {
                    if (resp.responseCode == 0) {
                        this.getBusiness();
                        this.btForm?.reset()
                    }
                }),
                error(err) {
                    console.log(err);
                },
            })
        } else {
            this.documentService.updateDocument(data).subscribe({
                next: (resp => {
                    if (resp.responseCode == 0) {
                        this.getBusiness();
                        this.btForm?.reset();
                        this.showDialog = false;
                    }
                }),
                error(err) {
                    console.log(err);
                },
            })
        }
    }
    cancel() {
        this.showDialog = false;
        this.btForm?.reset();

    }
    getActiveStatus(status: boolean): string {

        let result = status ? 'Active' : 'Disabled'
        return result;
    }
    getBusiness() {
        this.documentService.getDocument().subscribe({
            next: (resp => {
                if (resp.responseCode == 0) {
                    this.document.set(resp.data)
                }
            }),
            error(err) {
                console.log(err);
            },
        })
    }

}
