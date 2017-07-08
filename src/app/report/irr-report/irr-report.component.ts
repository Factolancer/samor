import {Component, OnInit, OnDestroy, ViewContainerRef} from '@angular/core';
import {Subscription} from "rxjs/Subscription";

import {IRR} from "./irr";
import {IRRService} from "./irr.service";
import {HttpService} from "../../core/services/http-service.service";
import {PdfReportService} from "../pdf-report.service";
import {ReportService} from "../report.service";
import {CustomJspdf} from "../transaction-report/jsPDFext";
import {isNullOrUndefined} from "util";
import {SnackBarService} from "../../core/services/snack-bar.service";

//declare let jsPDF;

@Component({
  selector: 'app-irr-report',
  templateUrl: './irr-report.component.html',
  styleUrls: ['../report.styles.scss'],
  providers: [IRRService]
})
export class IrrReportComponent implements OnInit,OnDestroy {

  irrData: IRR[];
    irrTabSubscription:Subscription;
  constructor(public irrService: IRRService, public http: HttpService, private pdfReportService:PdfReportService,
              private reportService: ReportService, private snackBarService: SnackBarService, private viewContainerRef: ViewContainerRef) {

  }

  ngOnInit() {

      this.irrTabSubscription = this.reportService.irrTabResult.subscribe((loadTab: boolean)=> {

          if(loadTab == true){
              this.irrService.getIRRData()
                  .subscribe(irr => {
                      this.irrData = irr as IRR[]
                  })
          }

      });
    // this.http.secureGet('/fund/getIrr')
    //     .subscribe(data => {
    //       this.irrData = data as IRR[]
    //     })


  }
    ngOnDestroy() {
        this.irrTabSubscription.unsubscribe();
    }

    prepareDownload(){
        this.irrService.getIRRData()
            .subscribe(irr => {
                this.irrData = irr as IRR[];
                this.download();
            }, error => {
                this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
            })

    }
  download(){
      var wrapperPdf = new CustomJspdf('p', 'pt');
      var pdf = wrapperPdf.jspdf;
        var columns = [{title:"Folio No", dataKey:"folioNo"},
            {title:"Fund",dataKey:"fundName"},
            {title:"IRR(%)",dataKey:"xirr"}];
      var rows = [];
        for(let row of this.irrData){
            let planDetails:string;
            let option:string;
            if(!isNullOrUndefined(row.divOption)){
                option = "Option - " + row.divOption;
            }
            if(!isNullOrUndefined(row.plan) || !isNullOrUndefined(row.divFreq)){
                planDetails = "Plan - ";
                if(!isNullOrUndefined(row.divFreq)){
                    planDetails += row.divFreq + " ";
                }
                if(!isNullOrUndefined(row.plan)){
                    planDetails += row.plan;
                }
            }

            let schemeDetails:string = row.fundName;
            if(!isNullOrUndefined(planDetails)){
                schemeDetails += "\n" + planDetails+", "+option;
            }
            rows.push({folioNo:row.folioNo,fundName:schemeDetails,xirr:row.xirr})
        }

      var tableStyle = {
            margin: {top: 90},
          headerStyles: {cellPadding: {vertical: 7}, fontSize: 8},
          bodyStyles: {cellPadding: {vertical: 6}, fontSize: 8, valign: 'middle'},
          drawCell: function (cell, data) {
              if (data.row.index == rows.length - 1) {
                  pdf.setFontStyle('bold');
              }
          }
        };
      var table = {"rows":rows, "columns":columns,"style":tableStyle,"title":"IRR Report"};
      this.pdfReportService.addTable([table],100,pdf,wrapperPdf);

      pdf.save("IRR Report.pdf");
  }

}
