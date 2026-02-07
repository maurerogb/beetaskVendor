
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LoaderService } from 'src/core/services/loader.service';

@Component({
    selector: 'app-image-file',
    imports: [CommonModule],
    template:`<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.5708 16.458C6.5708 16.458 7.3828 14.821 8.5648 14.821C9.7468 14.821 10.3508 16.196 11.6608 16.196C12.9698 16.196 14.4388 12.748 15.9228 12.748C17.4048 12.748 18.4708 15.139 18.4708 15.139"
                stroke="#661806" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M10.6394 9.10487C10.6394 9.96487 9.94241 10.6629 9.08141 10.6629C8.22141 10.6629 7.52441 9.96487 7.52441 9.10487C7.52441 8.24487 8.22141 7.54688 9.08141 7.54688C9.94241 7.54788 10.6394 8.24487 10.6394 9.10487Z"
                stroke="#661806" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path fill-rule="evenodd" clip-rule="evenodd"
                d="M3.25049 12C3.25049 18.937 5.56349 21.25 12.5005 21.25C19.4375 21.25 21.7505 18.937 21.7505 12C21.7505 5.063 19.4375 2.75 12.5005 2.75C5.56349 2.75 3.25049 5.063 3.25049 12Z"
                stroke="#4D1205" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
            `
            })
            export class FileImageComponent {
                constructor(public loaderService: LoaderService) { }
            }
