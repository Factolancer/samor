import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-user-journey',
    templateUrl: './user-journey.component.html',
    styleUrls: ['./shared.styles.scss']
})
export class UserJourneyComponent implements OnInit {

    @Input() set position(value: number) {
        this._position = value;
        this.cartOffset = 15 + 34 * (value - 1);

    }

    _position: number;
    cartOffset: number;

    constructor() {
        this.cartOffset = 17;
        this._position = 1;
    }

    ngOnInit() {

    }

}
