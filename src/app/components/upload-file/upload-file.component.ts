import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'app-upload-file',
    imports: [
        CommonModule
    ],
    templateUrl: './upload-file.component.html',
    styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {

    newfile: File | undefined;
    @Input() file: FormControl = new FormControl();
    @Input() fileType!: any;
    @Input() catImg!: any;
    @Output() uploadedFile: EventEmitter<File> = new EventEmitter<File>();

    fileName: any;

    openFilePicker(input: HTMLInputElement) {
        input.click();
    }
    onDrop(event: DragEvent) {
        event.preventDefault();
        if (event.dataTransfer?.files?.length) {
            this.newfile = event.dataTransfer.files[0];
        }
    }
    uploadFile(event: any) {
        console.log(this.newfile?.name);
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            this.newfile = event.target.files[0];
            console.log(this.newfile?.name);

            this.uploadedFile.emit(this.newfile)

            reader.onload = (_event: any) => {

                this.file.patchValue(_event.target.result);
            };

            reader.readAsDataURL(event.target.files[0]);
        }
    }
}
