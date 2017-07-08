import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Fund} from "../../models/fund";
import {Injectable} from "@angular/core";
import {Meta, Title} from "@angular/platform-browser";
import {title, metadescription} from "../../../properties/title";
import {Logger} from "../logger/logger";
import {UtilityService} from "./utility.service";

@Injectable()
export class TitleService {

    private fundCompareDataSource = new BehaviorSubject<Fund[]>([]);
    compareData = this.fundCompareDataSource.asObservable();

    constructor(private title: Title, private metaService: Meta, private logger: Logger, private utilityService:UtilityService) {
    }

    setTitle(key: string, data?: any) {
        let titleString = `${title[key]}`;
        if (!titleString || titleString.length == 0) {
            titleString = `${title["home"]}`
        }
        let parsedTitle = this.parseString(titleString, data);
        this.title.setTitle(parsedTitle);
    }

    private parseString(string: string, data: any): string {
        return this.utilityService.parseString(string,data);
    }

    public setMetaTags( key: string, data?: any) {
        let url = window.location;
        let metaURL = "https://fincash.com";
        if(url){
            metaURL = url.href;
        }
        let metaTitle = `${title[key]}`;
        if (!metaTitle || metaTitle.length == 0) {
            metaTitle = `${title["home"]}`;
        }
        metaTitle = this.parseString(metaTitle, data);
        let metaDescription = `${metadescription[key]}`;
        if (!metaDescription || metaDescription.length == 0) {
            metaDescription = `${metadescription["home"]}`
        }
        metaDescription = this.parseString(metaDescription, data);

        this.metaService.updateTag( { name:'description', content: metaDescription});
        this.metaService.updateTag( { property:'og:url', content: metaURL});
        this.metaService.updateTag( { property:'og:title', content:metaTitle});
        this.metaService.updateTag( { property:'og:description', content: metaDescription});
        this.metaService.updateTag( { name:'twitter:url', content: metaURL});
        this.metaService.updateTag( { name:'twitter:title', content:metaTitle});
        this.metaService.updateTag( { name:'twitter:description', content: metaDescription});
    }
}
