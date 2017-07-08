import {Component, OnInit} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {UserService} from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [UserService]
})
export class UserComponent implements OnInit {

  selectedTab: number;
  //@Output() changeFund = new EventEmitter();
  fundIndexSubscription:Subscription;

  constructor(private userService: UserService) {
    this.selectedTab = 0;
    // this.fundIndexSubscription=this.userService.fundIndexResult.subscribe((fund:number)=>{
    //   this.selectedTab = 2;
    // });
  }
  changeTabIndex($event) {
    this.selectedTab = 2;
    //this.changeFund.emit($event);
  }

  ngOnInit() {
  }

}
