import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from '../../../shared/shared.module';
import {UploadSectionComponent} from './upload-section.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [UploadSectionComponent],
    exports: [UploadSectionComponent]
})
export class UploadSectionModule {
}
