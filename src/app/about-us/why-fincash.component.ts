/**
 * Created by Fincash on 01-03-2017.
 */
import {Component, OnInit, OnDestroy} from '@angular/core';
import {HeaderService} from "../core/services/header.service";
import {TitleService} from "../core/services/title.service";

@Component({
    selector: 'why-fincash',
    templateUrl: './why-fincash.component.html',
    styleUrls: ['./about-us.styles.scss']
})
export class WhyFincashComponent implements OnInit, OnDestroy {

    constructor(private headerService: HeaderService, private titleService: TitleService){
        this.headerService.autoHideHeader(true);
    };
    ngOnInit(){
            this.titleService.setTitle("why_us");
            this.titleService.setMetaTags("why_us");
    }

    ngOnDestroy(){
        this.headerService.resetHeaderHiding();
    }


}
