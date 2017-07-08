import {Component, OnInit} from '@angular/core';
import {TitleService} from "../core/services/title.service";

@Component({
    selector: 'app-page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./shared.styles.scss']
})
export class PageNotFoundComponent implements OnInit {

    constructor(private titleService: TitleService) {
    }

    ngOnInit() {
        this.titleService.setTitle("page_not_found");
    }

}
