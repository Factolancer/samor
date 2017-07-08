import {Injectable, Inject} from "@angular/core";
import {Logger} from "../logger/logger";
import {Http, Headers, RequestOptions} from "@angular/http";
import {IAppConfig, APP_CONFIG} from "../../../environments/environment";
import {HttpService} from "./http-service.service";

@Injectable()
export class UploadService {

    uploadUrl: string;
    className: string;

    constructor(public logger: Logger, public http: Http, public httpService: HttpService, @Inject(APP_CONFIG) private config: IAppConfig){
        this.className = "UploadService"
        this.uploadUrl = this.config.fileUploadApi
    }

    public uploadDoc(formData: FormData){
       /* let headers = this.setHeader()
        let options = new RequestOptions({headers: headers});*/
        return this.http.post(this.uploadUrl, formData);
    }

    // httpService is being used for PLAY server request which sets header and all
    public saveFilePath(pathObj: any) {
        return this.httpService.securePost('/user/updateFilePath', pathObj)
    }

    private setHeader() {
        this.logger.debug(this.className, "set Content type");
        let headers = new Headers({'Content-Type': 'multipart/form-data'});
        return headers;
    }

    public areDocUploaded(){
        return this.httpService.secureGet('/user/getDmtIds')
            .map(response => {
                if (response['photodmtid'].length>0 &&
                    response['pandmtid'].length>0 &&
                    response['addressdmtid'].length>0 &&
                    response['bankdmtid'].length>0 &&
                    response['signaturedmtid'].length>0){
                    return true
                }
                else
                    return false;
            });
    }
}