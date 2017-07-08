import { Component, OnInit }    from '@angular/core';
import {DashboardDataService} from "../../core/services/dashboard-data.service";
import {ChartOptions} from "./chart-options";

import {AssetClassFund} from "../asset-funds";
import {Logger} from "../../core/logger/logger";

//import {Logger} from "../../shared/logger/logger";

@Component({
    selector: 'app-chart',
    styleUrls: ['./chart.component.scss'],
    templateUrl: './chart.component.html',
})
export class ChartComponent implements OnInit{

    investmentDataAvailable: boolean = false;
    className : string;
    constructor(public dataService: DashboardDataService, public chartOptions:ChartOptions , private logger  : Logger) {
        this.className = "ChartComponent";
    }
    chart:any;
    errorMessage: string;
    options: Object;
    point: any;
    isDrilled : boolean = false;
    noData:boolean = false;

    asset:Array<Object> =[];
    assetBreak:any = {};
    assetBreakOthers:any = {};
    assetOptions:Object;
    assetBreakupOptions:Object;

    serverError = {
        assetAllocation: false
    }

    createChartInstance(chartInstance: any) {
        this.chart = chartInstance;
    }
    back(){
        this.resetOption();
        this.assetOptions['series'][0]['data'] = this.asset;
        this.options = this.assetOptions;
        this.isDrilled = false;
    }
    resetOption(){
        this.options = [];
    }
    onPointSelect (e) {
        this.resetOption();
        if(e.context.name.toLowerCase().indexOf('others') >=0){
            let property = e.context.class;
            this.chart.series[0].update({data:this.assetBreakOthers[property]});
        } else{
            this.assetBreakupOptions['series'][0]['data'] = this.assetBreak[e.context.name];
        }
        this.options = this.assetBreakupOptions;
        this.isDrilled = true;
    }
    ngOnInit(){
        this.assetOptions = this.chartOptions.assetOptions;
        this.assetBreakupOptions = this.chartOptions.assetBreakupOptions;
        this.getInvestmentDetails();
    }

    isDataNull(any){
        return any.length?false:true;
    }
    sortDesc(a,b) {
    if (a.currentValue > b.currentValue)
        return -1;
    if (a.currentValue < b.currentValue)
        return 1;
    return 0;
}

    getInvestmentDetails(){

        this.dataService.getInvestmentDetails()
            .subscribe(
                assetClass => {
                    for (var x in assetClass) {
                        if (assetClass[x]['investedAmt'] > 0) //check if non-zero
                             this.asset.push(
                                 {
                                     'name':assetClass[x].assetClass,
                                     'y':assetClass[x].investedAmt
                                 });
                    }
                    this.noData = this.isDataNull(this.asset);
                    this.options = this.assetOptions;
                    this.assetOptions['series'][0]['data'] = this.asset;
                    this.investmentDataAvailable = true;
                },
                err=>{
                    this.logger.debug(this.className, 'an error occured');
                    this.serverError['assetAllocation'] = true;
                }
            );

        this.dataService.getInvestedFundDetails()
            .subscribe(
                assetClassFund => {
                    assetClassFund as AssetClassFund;
                    for(var i in assetClassFund) {
                        var property = assetClassFund[i]['assetClass'];
                        this.assetBreak[property] = [];
                        this.assetBreakOthers[property] = [];
                        assetClassFund[i]['fundDetailsList'].sort(this.sortDesc)
                        let fundCount = 0;
                        let othersToatalAmt = 0;
                        for(var x in assetClassFund[i]['fundDetailsList']){
                                fundCount++;
                                if(fundCount<9){
                                    this.assetBreak[property].push(
                                        {
                                            'name':assetClassFund[i]['fundDetailsList'][x]['fundName'],
                                            'plan':assetClassFund[i]['fundDetailsList'][x]['divFreq']+' '+assetClassFund[i]['fundDetailsList'][x]['plan'],
                                            'growth':assetClassFund[i]['fundDetailsList'][x]['divOption'],
                                            'class':property,
                                            'y': assetClassFund[i]['fundDetailsList'][x]['currentValue']
                                        });
                                } else{
                                    othersToatalAmt += assetClassFund[i]['fundDetailsList'][x]['currentValue']
                                    this.assetBreakOthers[property].push(
                                        {
                                            'name':assetClassFund[i]['fundDetailsList'][x]['fundName'],
                                            'plan':assetClassFund[i]['fundDetailsList'][x]['divFreq']+' '+assetClassFund[i]['fundDetailsList'][x]['plan'],
                                            'growth':assetClassFund[i]['fundDetailsList'][x]['divOption'],
                                            'class':property,
                                            'y': assetClassFund[i]['fundDetailsList'][x]['currentValue']
                                        });
                                    if(fundCount == assetClassFund[i]['fundDetailsList'].length) {
                                        this.assetBreak[property].push(
                                            {
                                                'name':'Others',
                                                'plan':'NA',
                                                'growth':'NA',
                                                'class':property,
                                                'y': othersToatalAmt
                                            }
                                        )
                                    }

                                }
                            }
                    }
                },
                err=>{
                    this.logger.debug(this.className,'an error occured');
                    this.serverError['assetAllocation'] = true;
                }
            );

    }


}
