import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {WatchlistProduct} from "./watchlist-product";
import {ActivatedRoute} from "@angular/router";
import {Scheme} from "./scheme";
import {FactsheetService} from "../factsheet/factsheet.service";
import {EquityAdvancedFactsheet} from "../factsheet/equity-advanced-factsheet";
import {WatchlistService} from "./watchlist.service";
import {Logger} from "../core/logger/logger";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WatchlistComponent implements OnInit {

  watchlistProducts: Scheme[];
  fundName: String;
  currentFund: Scheme;
  isFincashProduct: boolean = false;
  advancedFactsheet: any;
  annualReturnsLineGraphData: any;
  className : string;
  constructor(private route: ActivatedRoute, private watchlistService: WatchlistService,
              private factsheetService: FactsheetService, private logger :  Logger) {
    this.className = "WatchlistComponent";
  }

  ngOnInit() {
    this.route.data.forEach((data: { watchlistProducts: Scheme[] }) => {
      this.watchlistProducts = data.watchlistProducts;
      this.logger.debug(this.className," the data >>> ", data);
    });
  }

  fundSelected(fund: Scheme){
    this.fundName = fund.scheme_name;
  }

  removeProduct(value: any) {
     this.watchlistProducts = this.watchlistProducts.filter(scheme => scheme.scheme_id != value);
  }

  removeFund(fundId: number) {
    this.watchlistService.removeFundFromWatchlist(fundId).subscribe(
        output => alert(output.response)
    )

    this.watchlistProducts = this.watchlistProducts.filter(scheme => +scheme.scheme_id != fundId);

    /*if (this.schemes.funds.length > 1) {
     this.schemes.funds = this.schemes.funds.filter(fund => +fund.id != fundId);
     } else {
     this.remove.emit(this.schemes.schemes);
     }*/
  }

  selectFund(fund: Scheme) {
    this.currentFund = fund;

    this.factsheetService.getAdvancedFactsheet(10).subscribe(output => {
      this.logger.debug(this.className,output.factsheetData);
      this.advancedFactsheet = output as EquityAdvancedFactsheet;
    })

    this.annualReturnsLineGraphData = [["Year", "Fund", "Benchmark"]];
    for (let index = 0; index < this.advancedFactsheet.annualReturns.dataPoints.length; index++) {
      this.annualReturnsLineGraphData.push([this.advancedFactsheet.annualReturns.dataPoints[index],
        +this.advancedFactsheet.annualReturns.fundPerformance[index],
        +this.advancedFactsheet.annualReturns.benchmarkPerformance[index]]);
    }

    // this.onFundSelected.emit(fund);
    this.logger.debug(this.className,this.advancedFactsheet);
  }

  isSelected(fund: Scheme): boolean {
    if (!this.currentFund) {
      return false;
    }
    return this.currentFund.scheme_name === fund.scheme_name ? true : false;
  }

  public annualReturnsLineGraphOptions = {
    title: 'Fund Performance vs Benchmark',
    // subtitle: 'Earn more than saving account',
    vAxis: {
      title: 'Returns'
    },
    curveType: 'function',
    pointSize: 3,
    legend: {position: 'bottom'},
    // width: 640,
    // height: 320,
    series: {
      0: {
        annotations: {
          stemLength: 3,
          stemColor: 'white',
          position: 'down'
        }
      },
      1: {
        annotations: {
          stemLength: 5,
          stemColor: 'white'
        }
      }

      // textStyle: {fontSize: 12, color: 'green' }
    }
  };
}
