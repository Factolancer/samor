import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-investment-step',
  templateUrl: './investment-step.component.html',
  styleUrls: ['./investment-step.component.scss']
})

export class InvestmentStepComponent implements OnInit {

  constructor() { }

  investments = [
    {
      title: 'Smart Investment',
      steps: [{
        title: 'Solutions with Top Funds',
        image: '../../../assets/img/investment-step/badge.svg',
        details: 'Funds selected by industry specialists'
      },{
        title: 'Invest with Ease',
        image: '../../../assets/img/investment-step/easy-to-use-filled.svg',
        details: 'Better risk diversification to deliver superior returns'
      },{
        title: 'Monitor and Rebalance',
        image: '../../../assets/img/investment-step/monitor-data.svg',
        details: 'Review your investment regularly'
      }],
      btnTxt:"Get Started",
      routerUrl:'products'
    },
    {
      title: 'Do it Yourself',
      steps: [{
        title: 'Explore',
        image: '../../../assets/img/investment-step/explore.svg',
        details: 'Assess performance of 2200 funds. Choose schemes to match your Risk-Profile'
      }, {
        title: 'Select and Invest',
        image: '../../../assets/img/investment-step/pc-user.svg',
        details: 'Build a diversified portfolio and earn returns '
      },{
        title: 'Monitor',
        image: '../../../assets/img/investment-step/holding-report.svg',
        details: 'Buckle up!! Let the money work for you'
      }],
      btnTxt:"Explore Funds",
      routerUrl:'explore'
    }];

  ngOnInit() {
  }

}
