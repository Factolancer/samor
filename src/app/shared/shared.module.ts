import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {MaterialModule} from "@angular/material";
import {RatingPipe} from "./rating.pipe";
import {KeysPipe} from "./keys.pipe";
import {HeatMapDirective} from "./heat-map.directive";
import {PageNotFoundComponent} from "./page-not-found.component";
import {ConfirmationDialogComponent} from "./confirmation-dialog.component";
import {UserJourneyComponent} from "./user-journey.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {InfoDialogComponent} from "./info-dialog.component";
import {RiskometerPipe} from "./riskometer.pipe";
import {ReturnsPipe} from "./retruns.pipe";
import {SipAmountPipe} from "./sip-amount.pipe";
import {NAVComponent} from "./nav.component";
import {DatePipe} from "./date.pipe";
import {RatioPipe} from "./ratio.pipe";
import {StructurePipe} from "./structure.pipe";
import {ReportNumberPipe} from "./report-number.pipe";
import {LoadingDialogComponent} from "./loading-dialog.component";
import {FincashMaterialModule} from "./FincashMaterialModule";
import {RoundPipe} from "./round.pipe";
import {ClosableConfirmationDialogComponent} from "./closable-confimation-dialog.component";
import {Round2Pipe} from "./round2.pipe";
import {InstaConfirmationDialogComponent} from "./insta-confirmation-dialog.component";
import {CarouselComponent} from "./carousel.component";

@NgModule({
    imports: [CommonModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        FincashMaterialModule,
        FlexLayoutModule,
        RouterModule
    ],
    exports: [FormsModule,
        ReactiveFormsModule,
        CommonModule,
        HttpModule,
        RatingPipe,
        DatePipe,
        RiskometerPipe,
        KeysPipe,
        RouterModule,
        FincashMaterialModule,
        FlexLayoutModule,
        HeatMapDirective,
        UserJourneyComponent,
        ReturnsPipe,
        SipAmountPipe,
        NAVComponent,
        RatioPipe,
        StructurePipe,
        ReportNumberPipe,
        RoundPipe,
        Round2Pipe,
        CarouselComponent
    ],
    entryComponents: [ConfirmationDialogComponent, InfoDialogComponent, LoadingDialogComponent, ClosableConfirmationDialogComponent,
        InstaConfirmationDialogComponent],
    declarations: [RatingPipe, DatePipe, RiskometerPipe, KeysPipe, HeatMapDirective,
        PageNotFoundComponent, ConfirmationDialogComponent, LoadingDialogComponent, UserJourneyComponent, ReturnsPipe,
        InfoDialogComponent, SipAmountPipe, NAVComponent, RatioPipe, StructurePipe, ReportNumberPipe, RoundPipe,
        ClosableConfirmationDialogComponent,CarouselComponent,
        Round2Pipe, InstaConfirmationDialogComponent],
})
export class SharedModule {
}