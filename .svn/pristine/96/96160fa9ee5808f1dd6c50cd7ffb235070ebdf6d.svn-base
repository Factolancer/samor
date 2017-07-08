import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {CustomerNameService} from "../core/services/customer-name.service";
import {LoginService} from "../core/services/login.service";

@Component({
    selector: 'app-reg-wait',
    templateUrl: './registration-wait.component.html',
    styleUrls: ['./registration.styles.scss'],
})

export class RegistrationWaitComponent implements OnInit{
    firstName: string;

    constructor(public router: Router, public loginService: LoginService){}

    ngOnInit(){
        this.firstName = this.loginService.customerName.getValue()
    }
}