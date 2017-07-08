import { Component, OnInit } from '@angular/core';
import {DashboardDataService} from "../../core/services/dashboard-data.service";
import {Performer} from "../models";
import {Logger} from "../../core/logger/logger";

@Component({
  selector: 'app-top-performer',
  templateUrl: './top-performer.component.html',
  styleUrls: ['./top-performer.component.scss'],
})
export class TopPerformerComponent implements OnInit {

  performersDataAvailable: boolean;
  performers: Performer[];
  topPerformerCount : Number;
  active:Number;
  serverError:Object={
      topPerformer:false
    };
  className :  string;
  constructor(public dataService: DashboardDataService, private logger : Logger) {
      this.className =  "TopPerformerComponent";
      this.performersDataAvailable = false;
      this.topPerformerCount = 3;
  }

  ngOnInit() {
    this.getTopPerformers();
    this.active = 0;
  }
  getTopPerformers(){
    this.dataService.getTopPerformers()
        .subscribe(
            res=>{
              this.performers = res as Performer[];
              this.performersDataAvailable = true;
            },
            err=>{
                this.logger.debug(this.className,'an error occured');
                this.serverError['topPerformer'] =  true;
            }
        )
  }

}
