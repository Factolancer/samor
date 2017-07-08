import { Injectable } from '@angular/core';
import {HttpService} from "../../core/services/http-service.service";
import {AssetAllocation} from "./asset-allocation";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AssetAllocationService {

  constructor(private httpService:HttpService) { }

  getAssetAllocation(): Observable<AssetAllocation[]>{
    return this.httpService.secureGet('/report/getAssetAllocationReport')
        .map(res => res as AssetAllocation[])
  }
}
