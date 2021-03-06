import {Component, OnInit, Input} from "@angular/core";
import {DebtAdvancedFactsheet} from "../debt-advanced-factsheet";

@Component({
    selector: 'app-debt-view',
    templateUrl: './debt-view.component.html',
    styleUrls: ['../factsheet.styles.scss']
})
export class DebtViewComponent implements OnInit {


    sinceInceptionColumnGraphData: any;
    annualReturnsColumnGraphData: any;
    fundHoldingsPieGraphData: any;
    heatMapPivot = 0.2;
    isShortTerm: boolean = true;
    selectedTab = 0;

    @Input() set _advancedFactsheet(value: any) {
        this.advancedFactsheet = value;
        if (+this.advancedFactsheet.basicFactsheet.maturity > 36) {
            this.isShortTerm = false;
        }

        this.sinceInceptionColumnGraphData = [["Years", "Fund", "Benchmark"]];
        for (let index = 0; index < this.advancedFactsheet.sinceInceptionCmp.dataPoints.length; index++) {
            this.sinceInceptionColumnGraphData.push([this.advancedFactsheet.sinceInceptionCmp.dataPoints[index],
                +this.advancedFactsheet.sinceInceptionCmp.fundPerformance[index],
                +this.advancedFactsheet.sinceInceptionCmp.benchmarkPerformance[index]]);
        }

        this.annualReturnsColumnGraphData = [["Year", "Fund", "Benchmark"]];
        for (let index = 0; index < this.advancedFactsheet.annualReturns.dataPoints.length; index++) {
            this.annualReturnsColumnGraphData.push([this.advancedFactsheet.annualReturns.dataPoints[index],
                +this.advancedFactsheet.annualReturns.fundPerformance[index],
                +this.advancedFactsheet.annualReturns.benchmarkPerformance[index]]);
        }

        this.fundHoldingsPieGraphData = [["Credit Rating", "Allocation"]];
        for (let key in this.advancedFactsheet.fundHoldings.dataMap) {
            this.fundHoldingsPieGraphData.push([key, +this.advancedFactsheet.fundHoldings.dataMap[key]]);
        }
    }

    public sinceInceptionColumnChartOptions = {
        title: 'Fund Performance Vs Benchmark',
        titlePosition: 'out',
        hAxis: {
            title: 'Years',
            minValue: 0,
            textStyle: {
                bold: true,
                fontSize: 12,
                color: '#4d4d4d'
            },
            titleTextStyle: {
                bold: true,
                fontSize: 18,
                color: '#4d4d4d'
            }
        },
        vAxis: {
            title: 'Return(in %)',
            textStyle: {
                fontSize: 14,
                bold: true,
                color: '#848484'
            },
            titleTextStyle: {
                fontSize: 14,
                bold: true,
                color: '#848484'
            }
        },
        legend: {
            position: 'top',
            alignment: 'end'
        }
    };

    public annualReturnsColumnChartOptions = {
        title: 'Fund Performance Vs Benchmark',
        titlePosition: 'out',
        hAxis: {
            title: 'Year',
            minValue: 0,
            textStyle: {
                bold: true,
                fontSize: 12,
                color: '#4d4d4d'
            },
            titleTextStyle: {
                bold: true,
                fontSize: 18,
                color: '#4d4d4d'
            }
        },
        vAxis: {
            title: 'Return(in %)',
            textStyle: {
                fontSize: 14,
                bold: true,
                color: '#848484'
            },
            titleTextStyle: {
                fontSize: 14,
                bold: true,
                color: '#848484'
            }
        },
        legend: {
            position: 'top',
            alignment: 'end'
        }
    };

    public fundHoldingsPieChartOptions = {
        title: 'Credit Quality',
    };


    advancedFactsheet: DebtAdvancedFactsheet;


    constructor() {
    }

    ngOnInit() {
    }


}
