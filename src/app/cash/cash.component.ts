import {
    Component, OnInit, style, state, animate, transition, trigger, OnDestroy, ViewChild,
    ElementRef
} from '@angular/core';
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/interval";
import {TitleService} from "../core/services/title.service";
import {HeaderService} from "../core/services/header.service";

@Component({
  selector: 'app-cash',
  templateUrl: './cash.component.html',
  styleUrls: ['./cash.styles.scss'],
    animations: [
        trigger('showhide', [
            state('invisible', style({opacity: '0', visibility: 'hidden'})),
            state('visible', style({opacity: '1', visibility: 'visible'})),
            transition('invisible <=> visible', animate('2s linear'))
        ])
    ]
})
export class CashComponent implements OnInit, OnDestroy {

    @ViewChild('scrollCenter') private scrollToCenter: ElementRef;

  heading = 'invisible';
  index: number = 0 ;

  constructor(private router: Router, public titleService: TitleService, private headerService: HeaderService) {
    Observable.interval(2000)
          .subscribe(x => {
              //console.log(x);
              //this.headingvisible = !this.headingvisible;
              this.heading = (this.heading == 'visible') ? 'invisible' : 'visible';
              if (x % 2 == 0)
                this.index = (x/2)%3
          })
  }

  headingarray = [
      "Earn more by investing in SavingsPlus",
      "Double your savings from SavingsPlus",
      "Benefits of bank account.. with more returns - SavingsPlus"
  ]
  url = this.router.url;

  toDemo(){
    this.url = this.url + '/demo';
    this.router.navigate([this.url]);
  }

  toFunds(){
    this.url = this.url + '/funds'
    this.router.navigate([this.url]);
  }

  ngOnInit() {
      this.titleService.setTitle('cash');
      this.titleService.setMetaTags('cash');
  }
    ngAfterViewInit() {
        this.scrollToHCenter();
    }
    scrollToHCenter(): void {
        try {
            this.scrollToCenter.nativeElement.scrollLeft = this.scrollToCenter.nativeElement.scrollWidth * (.31);
        } catch(err) { }
    }

  ngOnDestroy(){
  }

}
