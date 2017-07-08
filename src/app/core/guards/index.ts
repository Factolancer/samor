import {AddressStatusGuard} from "./addressStatus.guard";
import {AuthGuard} from "./auth.guard";
import {BankStatusGuard} from "./bankStatus.guard";
import {FatcaStatusGuard} from "./fatcaStatus.guard";
import {KycGuard} from "./kyc.guard";
import {URLAccessGuard} from "./urlAccess.guard";
import {BasicDetailStatusGuard} from "./basicDetailStatus.guard";
import {BSEGuard} from "./bseGuard";
import {UserGuard} from "./user.guard";
import {LoginCheckGuard} from "./loginCheck.guard";
import {IndividualUserGuard} from "./individualUser.guard";
import {CheckoutURLAccessGuard} from "./checkoutUrlAccess.guard";


export const FC_GUARDS = [AddressStatusGuard,
    AuthGuard,
    UserGuard,
    BankStatusGuard,
    FatcaStatusGuard,
    KycGuard,
    URLAccessGuard,
    BasicDetailStatusGuard,
    BSEGuard,
    LoginCheckGuard,
    IndividualUserGuard,
    CheckoutURLAccessGuard];