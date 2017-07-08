import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-product-solution',
  templateUrl: './product-solution.component.html',
  styleUrls: ['./product-solution.component.scss']
})
export class ProductSolutionComponent implements OnInit,OnDestroy {

  constructor(private router:Router) { }

  productSolutions = [
    {
      title:'SavingsPlus',
      content:'Earn better returns than saving account with instant redemption and no exit load with liquid funds',
      image:"../../../assets/img/product/saving-plus.svg",
      routerUrl:'cash'
    },
    {
      title:'SmartSIP',
      content:'Invest in top 3 pre-selected funds to start a Systematic Investment Plan (SIP) in 2 mins',
      image:'../../../assets/img/product/smart-sip.svg',
      routerUrl:'sip'
    },
    {
      title:'TaxSaver',
      content:'Save tax upto INR 46k by investing in top 2 pre-selected Equity Linked Savings Scheme',
      image:'../../../assets/img/product//tax-saver.svg', routerUrl:'tax'
    }
  ];

  ngOnInit() {
  }

  goTo(link) {
    this.router.navigateByUrl(link);
  }

  ngOnDestroy(){

  }
}
