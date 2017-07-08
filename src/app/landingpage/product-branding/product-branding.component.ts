import {Component, OnInit, OnDestroy} from '@angular/core';

@Component({
  selector: 'app-product-branding',
  templateUrl: './product-branding.component.html',
  styleUrls: ['./product-branding.component.scss']
})
export class ProductBrandingComponent implements OnInit, OnDestroy {

  constructor() { }

  ngOnInit() {
  }
  productBenefits = [
    {
      title:'Invest in 5 Clicks',
      content:'A seamless process to make investment simple',
      image:'../../../assets/img/product/rupee-alarm.svg'
    },
    {
      title:'In-house Fund Rating',
      content:'Authentic methodology of fund selection & unbiased rating',
      image:"../../../assets/img/product/data-chart.svg"
    },
    {
      title:'Product Solutions',
      content:'Product solutions designed to cater your needs',
      image:'../../../assets/img/product/product-solution.svg'
    },
    {
      title:'Save Taxes',
      content:'Invest in tax-saving instruments and earn tax-free healthy returns',
      image:'../../../assets/img/product/savings.svg'
    }
  ];

  ngOnDestroy(){

  }

}
