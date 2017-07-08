import {Inject, ModuleWithProviders, NgModule, Optional, SkipSelf} from "@angular/core";
import {FC_SERVICES} from "./services/index";
import {FC_GUARDS} from "./guards/index";
import {HeaderComponent} from "./header/header.component";
import {FooterComponent} from "./footer/footer.component";
import {AppConfig, APP_CONFIG, IAppConfig} from "../../environments/environment";
import {JwtHelper} from "angular2-jwt";
import {InfiniteScrollModule} from "ngx-infinite-scroll";
import {SharedModule} from "../shared/shared.module";
import {DEBUG_LOGGER_PROVIDERS, INFO_LOGGER_PROVIDERS} from "./logger/providers";
import {CartNavigationIconComponent} from "./header/cart-navigation-icon.component";
import {BaseCookieOptions, CookieOptions} from "./services/cookie/services/base-cookie-options";
import {CookieService} from "./services/cookie/services/cookies.service";

export function providerType() {
    //return INFO_LOGGER_PROVIDERS
    return DEBUG_LOGGER_PROVIDERS
}

//support for cookies
export function cookieSupport() {
    return [{provide: CookieOptions, useClass: BaseCookieOptions},
        {provide: CookieService, useFactory: cookieServiceFactory, deps: [CookieOptions]}]
}

export function cookieServiceFactory(options: CookieOptions) {
    return new CookieService(options);
}


@NgModule({
    imports: [SharedModule, InfiniteScrollModule],
    declarations: [HeaderComponent, FooterComponent, CartNavigationIconComponent],
    providers: [FC_SERVICES, FC_GUARDS, JwtHelper, providerType(), cookieSupport()],
    exports: [HeaderComponent, FooterComponent],
})
export class CoreModule {

    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only');
        }
    }

    static forRoot(): ModuleWithProviders {
        return {
            ngModule: CoreModule,
            providers: [{provide: APP_CONFIG, useValue: AppConfig}]
        };
    }


}
