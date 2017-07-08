import {Component, OnInit} from '@angular/core';
import {DemoService} from "./demo.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/timer';
import {Subscription} from "rxjs/Subscription";

@Component({
    selector: 'demoa',
    templateUrl: './demoa.component.html',
    styleUrls: ['./../cash.styles.scss']
})
export class DemoaComponent implements OnInit {

    heading = 'invisible';
    index: number = 0;
    state = 'true';
    visibility = 'shown';
    finished2: boolean = false;
    data2StateSub: Subscription;



    constructor(private demoService: DemoService) {
    }
    quesActive:boolean = true;

    showMsg1 = true;
    showMsg2 = false;
    showMsg3 = false;
    showanim1 = false;
    showanim2 = false;
    showanim3 = false;

    demoState: any = [
        {
            'showMsg1': false,
            'showMsg2': true,
            'showMsg3': false,
            'showanim1': true,
            'showanim2': false,
            'showanim3': false
        },
        {
            'showMsg1': false,
            'showMsg2': false,
            'showMsg3': true,
            'showanim1': true,
            'showanim2': true,
            'showanim3': false
        },
        {
            'showMsg1': false,
            'showMsg2': false,
            'showMsg3': false,
            'showanim1': true,
            'showanim2': true,
            'showanim3': true
        }
    ];


    ngOnInit() {

        this.data2StateSub = Observable.timer(5000, 5000).subscribe(t => {

            this.quesActive = false;
            let tmpSub = Observable.timer(3000).subscribe(t1 => {
                if (t < this.demoState.length - 1)
                   this.quesActive = true;
                tmpSub.unsubscribe();
            });

            let state = this.demoState[t];
            this.showMsg1 = state.showMsg1;
            this.showMsg2 = state.showMsg2;
            this.showMsg3 = state.showMsg3;
            this.showanim1 = state.showanim1;
            this.showanim2 = state.showanim2;
            this.showanim3 = state.showanim3;


            if (t == this.demoState.length - 1) {
                this.finished2 = true;
                this.demoService.setAnimationNo(2);
                this.data2StateSub.unsubscribe();
            }
        });


    }
}


