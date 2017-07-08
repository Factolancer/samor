import {NgModule} from "@angular/core";
import {UserComponent} from "./user.component";
import {SharedModule} from "../shared/shared.module";
import {userRouting} from "./user.routes";
import {PasswordComponent} from "./password/password.component";

@NgModule({
    imports: [
        SharedModule,
        userRouting
    ],
    declarations: [UserComponent, PasswordComponent]
})
export class UserModule {
}
