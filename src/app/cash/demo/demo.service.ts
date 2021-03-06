/**
 * Created by Fincash on 24-02-2017.
 */
import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs/BehaviorSubject";

@Injectable()
export class DemoService {

    constructor() {};

    private animationSubject = new BehaviorSubject<number>(0);
    animation = this.animationSubject.asObservable();

    setAnimationNo(count: number) {
        this.animationSubject.next(count);
    }
    resetAnimationNo() {
        this.setAnimationNo(0);
    }

}