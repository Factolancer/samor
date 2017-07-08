import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ExploreFundsService} from '../core/services/explore-funds.service';
import {TitleService} from '../core/services/title.service';

import { AMCPartners, Partners } from './partners';
import { AMCPartnersModel, PartnersModel } from '../models/partners';
import { APP_CONFIG, IAppConfig } from '../../environments/environment';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./about-us.styles.scss']
})
export class PartnersComponent implements OnInit, OnDestroy {

    partners: PartnersModel[];
    amcPartners: AMCPartnersModel[];
    staticImagePath: string;

    constructor(@Inject(APP_CONFIG) private config: IAppConfig, private exploreFundService: ExploreFundsService, private titleService: TitleService) {
         this.partners = Partners;
         this.amcPartners = AMCPartners;
         this.staticImagePath = this.config.staticImagePath;
    }

    ngOnInit() {
        this.titleService.setTitle("partners");
        this.titleService.setMetaTags("partners");
    }

    navigateToAMC(amcName: string) {
        this.exploreFundService.navigateToAmc(amcName);
    }

    ngOnDestroy() {
    }
}
