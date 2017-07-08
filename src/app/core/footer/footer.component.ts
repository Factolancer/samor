import {
    animate,
    Component,
    Inject,
    OnDestroy,
    OnInit,
    state,
    style,
    transition,
    trigger,
    ViewContainerRef
} from '@angular/core';
import { HttpService } from '../services/http-service.service';
import { SnackBarService } from '../services/snack-bar.service';
import { APP_CONFIG, IAppConfig } from '../../../environments/environment';
import { Logger } from '../logger/logger';
import { Observable } from 'rxjs/Observable';
import { HeaderService } from '../services/header.service';

@Component({
    selector: 'fincash-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    animations: [
        trigger('collapseChange', [
            state('collapse' , style({ height: '0px', overflow : 'hidden' }) ),
            state('expand',  style({ height: '*' }) ),
            transition('* => *', animate('.25s ease-in'))
        ])
    ]
})
export class FooterComponent implements OnInit, OnDestroy {

    hideFooter:Observable<boolean>;
    copyYear: string;
    contact: string;
    supEmail: string;
    addressMapLink: any;
    socialLinks: Array<any> = [];
    className: String;

    private collapsePS;
    private collapseMF;
    private collapseIns;
    private collapseCal;
    private collapseAb;
    private collapseSoc;

    constructor(private viewContainerRef: ViewContainerRef, private httpService: HttpService, private snackBarService: SnackBarService, private headerService: HeaderService,
                @Inject(APP_CONFIG) private config: IAppConfig, public logger: Logger) {
        this.className = "FooterComponent"
        this.copyYear = new Date().getFullYear() + '';
        this.contact = '+91-7700954611';
        this.supEmail = 'support@fincash.com';
        this.addressMapLink = 'https://goo.gl/maps/5ScweEZAUU82';
        this.socialLinks = [{
            'image': this.config.staticImagePath + '/assets/img/social-icons/linkedin-white-logo.svg',
            'link': 'https://www.linkedin.com/company/fincash.com',
            'alt': 'linkedin_logo'
        }, {
            'image': this.config.staticImagePath + '/assets/img/social-icons/facebook-white-logo.svg',
            'link': 'https://www.facebook.com/fincash.in',
            'alt': 'facebook_logo'
        }, {
            'image': this.config.staticImagePath + '/assets/img/social-icons/twitter-white-logo.svg',
            'link': 'https://twitter.com/TheFincash',
            'alt': 'twitter_logo'
        }, {
            'image': this.config.staticImagePath + '/assets/img/social-icons/quora-white-logo.svg',
            'link':'https://www.quora.com/topic/Fincash-com',
            'alt': 'quora_logo'
        }

        ];

        this.hideFooter = this.headerService.headerVisibilitySubject.asObservable();
        this.collapsePS = false;
        this.collapseMF = false;
        this.collapseIns = false;
        this.collapseCal = false;
        this.collapseAb = false;
        this.collapseSoc = false;
    }

    ngOnInit() {
        this.httpService.httpErrorObservable.subscribe(error => {
            this.snackBarService.showSnackBar("PLEASE TRY AGAIN", "OKAY", this.viewContainerRef);
        });

        this.snackBarService.guardMessageObservable.subscribe(msg => {
            let messages = '';
            if(msg.length>0){
                for (let value of msg){
                    if(messages.length>0){
                        messages += "\n";
                    }
                    messages += value
                }
            }
            this.logger.debug(this.className, messages)
            if (messages.length>0){
                let snackBarReference = this.snackBarService.showIndefiniteSnackBar(messages, "CLOSE", this.viewContainerRef);
                snackBarReference.onAction().subscribe(() => {
                    this.snackBarService.resetGuardMessages();
                })
            }
        })
    }

    ngOnDestroy() {

    }

}
