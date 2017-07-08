import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {SharedModule} from '../../../shared/shared.module';
import {OtherSectionComponent} from './other-section.component';

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [OtherSectionComponent],
    exports: [OtherSectionComponent]
})
export class OtherSectionModule {
}
