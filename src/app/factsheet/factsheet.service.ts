import { Injectable } from '@angular/core';
import { HttpService } from '../core/services/http-service.service';
import { MdDialogConfig } from '@angular/material';
import { HeaderService } from '../core/services/header.service';

@Injectable()
export class FactsheetService {


    constructor(private httpService: HttpService, private headerService: HeaderService) {
    }


    getBasicFactsheet(id: number) {
        return this.httpService.post('/fund/getBasicFactsheet', {"id": id});
    }

    getAdvancedFactsheet(id: number) {
        return this.httpService.post('/fund/getAdvancedFactsheet', {"id": id});
    }

    getFactsheetDialogConfig(): MdDialogConfig {
        let config = new MdDialogConfig();
        config.role = 'dialog';
        let device = this.headerService.deviceType();
        if (device == 'xs' || device == 'sm'){
            config.width = '100%';
        }else {
            config.width = '60%';
        }
        //config.disableClose = true;
        //config.height= '85vh';
        return config;
    }
}
