import { CommonModule } from "@angular/common";
import { Component, EventEmitter, input, Input, Output } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
    selector: '[vendor-upload], vendor-upload',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="flex flex-col mr-12 ">

        <label for="license-upload"
            class=" upload   mt-4  cursor-pointer   rounded-lg p-4 text-center space-y-2 hover:bg-rose-50">
            @if(newfile?.size){

            <img [src]="file.value" alt="" width="100" height="100">


            <span class="text-sm font-medium text-rose-900">
                {{newfile?.name}} </span>
            }@else {

                @if(imgUrl.length > 0){
                <img [src]="imgUrl" alt="" width="100" height="100">
                }
                @else {
                <span class="flex flex-col text-3xl items-center justify-center mb-4 text-rose-900">
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6.5708 16.458C6.5708 16.458 7.3828 14.821 8.5648 14.821C9.7468 14.821 10.3508 16.196 11.6608 16.196C12.9698 16.196 14.4388 12.748 15.9228 12.748C17.4048 12.748 18.4708 15.139 18.4708 15.139"
                        stroke="#661806" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M10.6394 9.10487C10.6394 9.96487 9.94241 10.6629 9.08141 10.6629C8.22141 10.6629 7.52441 9.96487 7.52441 9.10487C7.52441 8.24487 8.22141 7.54688 9.08141 7.54688C9.94241 7.54788 10.6394 8.24487 10.6394 9.10487Z"
                        stroke="#661806" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                    <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3.25049 12C3.25049 18.937 5.56349 21.25 12.5005 21.25C19.4375 21.25 21.7505 18.937 21.7505 12C21.7505 5.063 19.4375 2.75 12.5005 2.75C5.56349 2.75 3.25049 5.063 3.25049 12Z"
                        stroke="#4D1205" stroke-width="1.5" stroke-linecap="round"
                        stroke-linejoin="round" />
                </svg>


                <span class="text-sm font-medium  text-rose-900">
                    Upload picture </span>
            </span>
                }


            }

            <input id="license-upload" (change)="uploadFile($event)" type="file"
                class="hidden" />
        </label>
    </div>
    `

})
export class VendorUpload {
    //uploadedFiles: any[] = [];
    newfile: File | undefined;
    @Input() file: FormControl = new FormControl();
    @Output() uploadedFile: EventEmitter<File> = new EventEmitter<File>();
    @Input() imgUrl: string = '';

    uploadFile(event: any) {
        console.log(this.newfile?.name);
        if (event.target.files?.[0]) {
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
