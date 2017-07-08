/**
 * Created by Fincash on 28-02-2017.
 */
import {Injectable} from "@angular/core";

import {StaticContent} from "./constants/staticroutes";

@Injectable()

export class StaticTxtService {

    staticContent = StaticContent;
    className:string;

    constructor(){

    };

    getContent(property){
        return this.staticContent[property] ||'';
    }


}