import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {IAppConfig, APP_CONFIG} from "../../../environments/environment";

@Component({
  selector: 'app-product-feature',
  templateUrl: './product-feature.component.html',
  styleUrls: ['./product-feature.component.scss']
})
export class ProductFeatureComponent implements OnInit, OnDestroy {

  constructor(@Inject(APP_CONFIG) private config: IAppConfig) { }
  productFeatures = [{
                      image:this.config.staticImagePath+'/assets/img/features/easy-to-use-hollow.svg',
                      content:'Easy to Use',
                      alt:'easy_to_use_icon'
                    },{
                      image:this.config.staticImagePath+'/assets/img/features/resource-center.svg',
                      content:'Resource Center',
                      alt:'resource_center_icon'
                    },{
                      image:this.config.staticImagePath+'/assets/img/features/proven-methodology.svg',
                      content:'Proven Methodology',
                      alt:'proven_methodology_icon'
                    },{
                      image:this.config.staticImagePath+'/assets/img/features/secure.svg',
                      content:'Safe & Secure Transaction',
                        alt:'security_icon'
                    },{
                      image:this.config.staticImagePath+'/assets/img/features/top-service.svg',
                      content:'Top-notch Service',
                        alt:'service_icon'
                    }];

  ngOnInit() {
  }
  ngOnDestroy(){

  }

}
