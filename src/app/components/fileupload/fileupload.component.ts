import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NoteComponent } from "../note";
import { FileImageComponent } from "../image-file";
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-file-upload',
    standalone: true,
    templateUrl: './fileupload.component.html',
    imports: [NoteComponent,ButtonModule, FileImageComponent]
})
export class FileUploadComponent {

    @Input() accept = '*/*'; // image/* or .pdf,.docx
    @Output() fileChange = new EventEmitter<Event>();
    @Input() isImage: boolean = false;
    @Input() imageUrl: string = '';
    file?: File;
    previewUrl?: string;
    inputId = crypto.randomUUID();

    get isImageFile(): boolean {
        return !!this.file && this.file.type.startsWith('image/');
    }

    onSelect(event: Event) {
        this.fileChange.emit(event);
        const input = event.target as HTMLInputElement;
        if (!input.files?.length) return;
        console.log(input.files.item(0)?.name);

        this.file = input.files[0];


        if (this.isImageFile) {
            const reader = new FileReader();
            reader.onload = () => (this.previewUrl = reader.result as string);
            reader.readAsDataURL(this.file);
        }
    }
    removeFile() {
        this.file = undefined;
        this.previewUrl = undefined;
    }
}
