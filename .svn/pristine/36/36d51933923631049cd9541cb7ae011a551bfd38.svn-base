import {NgModule} from "@angular/core";
import {CashComponent} from "./cash.component";
import {cashrouting} from "./cash.routing";
import {SharedModule} from "../shared/shared.module";
import {CashCardComponent} from "./cashcard.component";
import {DemoModule} from "./demo/demo.module";
import {SavingsPlusFundResolveService} from "./cashfunds/savings-plus-fund-resolve.service";
import {CashfundsComponent} from "./cashfunds/cashfunds.component";
import {SavingsPlusCardComponent} from "./cashfunds/savings-plus-card.component";

@NgModule({
    imports: [
        cashrouting, SharedModule, DemoModule
    ],
    declarations: [CashComponent, CashCardComponent, CashfundsComponent, SavingsPlusCardComponent],
    providers: [SavingsPlusFundResolveService]
})
export class CashModule {
}
