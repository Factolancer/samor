import {Component, OnInit} from "@angular/core";
import {DemoService} from "./demo.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";


@Component({
    selector: 'demoall',
    templateUrl: './demoall.component.html',
    styleUrls: ['./../cash.styles.scss']
})
export class DemoallComponent implements OnInit {

    index: number = 0 ;
    demo3StateSub:Subscription;
    options: Object;

    constructor(private demoService:DemoService) {   }

    ngOnInit() {
        let date= new Date();
        let cYear = date.getFullYear();
        this.options = {
            title : { text : 'Savings Account Vs SavingsPlus',
            style:{'font-size':'12px'}
            },
            credits: {enabled: false},
            exporting: {enabled: false},
            chart:{
                width: 420,
                height: 260
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            xAxis: {
                categories: [cYear, cYear+1, cYear+2]
            },
            colors:["#77ba78", "#BF3235"],
            yAxis: {
                title: {
                    text: 'Amount (in INR)'
                },
                labels: {
                    formatter: function () {
                        var val = this.value;
                        if (val >= 10000000) val = (val / 10000000).toFixed(1) + 'Cr';
                        else if (val >= 100000) val = (val / 100000).toFixed(1) + 'Lac';
                        else if (val >= 1000) val = (val / 1000).toFixed(1) + 'k';
                        return val;
                    }
                }
            },
            tooltip: {
                formatter: function () {
                    var valy = this.point.y;
                    if (valy >= 10000000) valy = (valy / 10000000).toFixed(2) + 'Cr';
                    else if (valy >= 100000) valy = (valy / 100000).toFixed(2) + 'Lac';
                    else if (valy >= 1000) valy = (valy / 1000).toFixed(2) + 'k';
                    var valx = this.point.x;
                    return 'Year <b>'+ valx +'</b> '+' INR '+' <b>'+valy+'</b>';
                    //return val;
                }
            },
            legend: {
                layout: 'horizontal',
                verticalAlign: 'bottom',
                borderWidth:0
            },
            series: [{
                name: 'Savings Plus',
                data: [26646, 105303, 240285]
            }, {
                name: 'Savings Account',
                data: [13160,  51301, 115441]
            }]
        };

        this.demo3StateSub = Observable.timer(3000).subscribe(t => {
            this.demoService.setAnimationNo(3);
            this.demo3StateSub.unsubscribe();
        });


    }


}
