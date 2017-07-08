import {Injectable} from "@angular/core";
import {HttpService} from "../core/services/http-service.service";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {User, UserBasic, UserBank, UserFatca, UserAddress, UserNominee} from "../models/user";
import {Contact} from "../models/contact";
import {Address} from "../models/address";
import {Bank} from "../models/bank";
import {Logger} from "../core/logger/logger";
import {DatePipe} from "@angular/common";

@Injectable()
export class UserService {

    private userSubject: BehaviorSubject<User>;
    currentUser: Observable<User>;

    public basicLoaded: boolean;
    public addressLoaded: boolean;
    public bankLoaded: boolean;
    public fatcaLoaded: boolean;
    public nomineeLoaded: boolean;
    /*basicSecObservable: Observable<boolean>;
    addressSecObservable: Observable<boolean>;
    bankSecObservable: Observable<boolean>;
    fatcaSecObservable: Observable<boolean>;
    nomineeSecObservable: Observable<boolean>;*/

    public pageLoaded: BehaviorSubject<boolean>;
    pageLoadedObservable: Observable<boolean>;

    public addressSubject: BehaviorSubject<Address>;
    public addressObservable: Observable<Address>;

    className: string;

    constructor(private fchttpservice: HttpService, private logger: Logger) {
        let user = new User(new UserBasic('', '', '', '', '', '', '', new Contact('', '', '', ''), '', '', ''),
            new UserAddress(new Address('', '', '', '', '', '', '', '', ''), new Address('', '', '', '', '', '', '', '', ''), true),
            new UserBank('', '', '', new Bank('', '', '', '', '', '', '', ''), ''),
            new UserFatca('', '', '', '', '', '', '', '', '', ''),
            new UserNominee('', '', '', '', new Address('', '', '', '', '', '', '', '', ''))
        );
        this.className = "UserSerice";
        this.userSubject = new BehaviorSubject<User>(user);
        this.currentUser = this.userSubject.asObservable();

        this.pageLoaded = new BehaviorSubject<boolean>(false);
        this.pageLoadedObservable = this.pageLoaded.asObservable();

        this.addressSubject = new BehaviorSubject<Address>(new Address('', '', '', '', '', '', '', '', ''));
        this.addressObservable = this.addressSubject.asObservable();

        this.basicLoaded = false;
        this.addressLoaded = false;
        this.bankLoaded = false;
        this.fatcaLoaded = false;
        this.nomineeLoaded = false;

       /* this.basicSecObservable = this.basicLoaded.asObservable();
        this.addressSecObservable = this.addressLoaded.asObservable();
        this.bankSecObservable = this.bankLoaded.asObservable();
        this.fatcaSecObservable = this.fatcaLoaded.asObservable();
        this.nomineeSecObservable = this.nomineeLoaded.asObservable();*/
    }

    checkPageLoad(){
        if (this.basicLoaded && this.addressLoaded && this.bankLoaded && this.fatcaLoaded && this.nomineeLoaded){
            this.logger.debug(this.className, "PAGE LOADED ");
            this.pageLoaded.next(true);
        }
    }

    public setUserSubject(user: User) {
        this.userSubject.next(user);
    }

    public getUserSubject() {
        return this.userSubject.getValue();
    }

    public setAddressSubject(address: Address) {
        this.addressSubject.next(address);
    }

    public getAddressSubject() {
        this.addressSubject.getValue();
    }

    getUserBasicData() {
        this.fchttpservice.secureGet('/user/getUserBasicData')
            .subscribe(output => {
                let user = this.getUserSubject();
                user.userBasic = output as UserBasic;
                this.setUserSubject(user);
                this.basicLoaded = true;
                this.checkPageLoad();
                this.logger.debug(this.className,"BasicLoaded ", this.basicLoaded);
            })
    }

    getUserAddressData() {
        this.fchttpservice.secureGet('/user/getUserAddressData')
            .subscribe(output => {
                let user = this.getUserSubject();
                user.userAddress = output as UserAddress;
                this.setUserSubject(user);
                this.addressLoaded = true;
                this.checkPageLoad();
                this.setAddressSubject(user.userAddress.permanentAddress);
                this.logger.debug(this.className, "addressLoaded ", this.addressLoaded);
            })
    }

    getUserBankData() {
        this.fchttpservice.secureGet('/user/getUserBankData')
            .subscribe(output => {
                let user = this.getUserSubject();
                user.userBank = output as UserBank;
                this.setUserSubject(user);
                this.bankLoaded = true;
                this.checkPageLoad();
                this.logger.debug(this.className, "bankLoaded ", this.bankLoaded);
            })
    }

    getUserFatcaData() {
        this.fchttpservice.secureGet('/user/getUserFatcaData')
            .subscribe(output => {
                let user = this.getUserSubject();
                user.userFatca = output as UserFatca;
                this.setUserSubject(user);
                this.fatcaLoaded = true;
                this.checkPageLoad();
                this.logger.debug(this.className, "FatcaLoaded ", this.fatcaLoaded);
            })
    }

    getUserNomineeData() {
        this.fchttpservice.secureGet('/user/getUserNomineeData')
            .subscribe(output => {
                let user = this.getUserSubject();
                user.userNominee = output as UserNominee;
                this.setUserSubject(user);
                this.nomineeLoaded = true;
                this.checkPageLoad();
                this.logger.debug(this.className, "NomineeLoaded ", this.nomineeLoaded);
            })
    }

    updateBasicData(userdata: any, firstName: string, middleName: string, lastName: string) {
        this.logger.debug(this.className,"In UpdateBasicData");
        let user = this.getUserSubject();
        user.userBasic = userdata;
        user.userBasic.firstName = firstName;
        user.userBasic.lastName = lastName;
        user.userBasic.middleName = middleName;
        user.userBasic.dob = (new DatePipe("en-US").transform(new Date(user.userBasic.dob),'yyyy-MM-dd'));
        return this.fchttpservice.securePost('/user/postUserBasicData', user.userBasic);
        // this.updateData(user);
    }

    updateBankData(userdata: any, accountNumber: string) {
        let user = this.getUserSubject();
        user.userBank = userdata;
        user.userBank.accountNumber = accountNumber;
        return this.fchttpservice.securePost('/user/postUserBankData', user.userBank);
    }

    updateFatcaData(userdata: any) {
        let user = this.getUserSubject();
        user.userFatca = userdata;
        this.logger.debug(this.className,user)
        return this.fchttpservice.securePost('/user/postUserFatcaData', user.userFatca);
    }

    updateAddressData(userdata: any) {
        let user = this.getUserSubject();
        user.userAddress = userdata;

        return this.fchttpservice.securePost('/user/postUserAddressData', user);
    }

    updateNomineeData(userdata: any) {
        let user = this.getUserSubject();
        user.userNominee = userdata;
        user.userNominee.nomineeDob = (new DatePipe("en-US").transform(new Date(user.userNominee.nomineeDob),'yyyy-MM-dd'));
        return this.fchttpservice.securePost('/user/postUserNomineeData', user.userNominee);
    }


    getBankAutoCompleteData(term: string) {
        return this.fchttpservice.securePost("/lookup/getBankSuggestions", {term: term});
    }

    createRegistrationTicket(){
        return this.fchttpservice.secureGet("/user/registrationTicket")
    }
}