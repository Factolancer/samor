/**
 * Created by Fincash on 28-02-2017.
 */
/**
 * Created by Fincash on 18-02-2017.
 */

import {NgModule} from "@angular/core";

import {SharedModule} from "../shared/shared.module";

import {staticRouting} from "./static.routes";

import {TeamComponent} from "../about-us/team.component";
import {WhyFincashComponent} from "../about-us/why-fincash.component";
import {StaticTextComponent} from "./static-txt.component";

import {StaticTxtService} from "./static-txt.service";
import {PartnersComponent} from "../about-us/partners.component";


@NgModule({
    imports: [
        SharedModule,
        staticRouting
    ],
    declarations: [TeamComponent, WhyFincashComponent , StaticTextComponent, PartnersComponent],
    providers : [StaticTxtService]
})
export class StaticModule {
}
