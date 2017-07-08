import {Component, OnInit} from "@angular/core";
import {SipCalcGoal} from "./sip-calc-goal";
import {Router, ActivatedRoute} from "@angular/router";
import {Logger} from "../../core/logger/logger";
import {SipGoals} from "./goals";
import {TitleService} from "../../core/services/title.service";

@Component({
    selector: 'app-sip-calc-goal',
    templateUrl: './sip-calc-goal.component.html',
    styleUrls: ['./sip-calc.styles.scss']
})
export class SipCalcGoalComponent implements OnInit {

    sipGoals: SipCalcGoal[];

    constructor(private router: Router, private route: ActivatedRoute, private logger: Logger,
                private titleService: TitleService) {
        this.sipGoals = SipGoals;
    }


    ngOnInit() {
        this.titleService.setTitle("sip_calculator");
        this.titleService.setMetaTags("sip_calculator");
    }

    selectGoal(goal: SipCalcGoal) {
        this.router.navigate(['questions', goal.id], {relativeTo: this.route});
    }
}
