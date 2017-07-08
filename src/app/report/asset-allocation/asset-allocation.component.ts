import {Component, OnInit, OnDestroy, ViewContainerRef} from "@angular/core";
import {Subscription} from "rxjs/Subscription";
import {ReportService} from "../report.service";
import {Input} from '@angular/core';
import {AssetAllocationService} from "./asset-allocation.service";
import {AssetAllocation} from "./asset-allocation";
import {SnackBarService} from "../../core/services/snack-bar.service";

//declare let jsPDF;

@Component({
    selector: 'app-asset-allocation',
    templateUrl: './asset-allocation.component.html',
    styleUrls: ['../report.styles.scss'],
})
export class AssetAllocationComponent implements OnInit,OnDestroy {

    @Input() currentTab;
    assetTabSubscription: Subscription;
    assetAllocationData: any;
    assetAllocationDataAvailable: boolean = false;

    constructor(private reportService: ReportService, private assetAllocationService: AssetAllocationService, private snackBarService: SnackBarService,
                private viewContainerRef: ViewContainerRef) {}

    ngOnInit() {
        this.assetTabSubscription = this.reportService.assetAllocationTabResult.subscribe((loadTab: boolean) => {
            if (loadTab == true) {
                this.assetAllocationData = [['Category', 'Amount']];
                this.assetAllocationService.getAssetAllocation()
                    .subscribe(assetAllocationDetails => {
                        let assetAllocationDetailsList = assetAllocationDetails as AssetAllocation[];
                        for (let assetAllocation of assetAllocationDetailsList) {
                            this.assetAllocationData.push([assetAllocation.assetClass, assetAllocation.investedAmt]);

                            if (assetAllocation.investedAmt)
                                this.options['series'][0]['data'].push({
                                    name: assetAllocation.assetClass,
                                    y: assetAllocation.investedAmt
                                });

                            this.assetAllocationDataAvailable = true;

                        }
                    }, error => {
                        this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                    });
            }
        });
    }

    ngOnDestroy() {
        this.assetTabSubscription.unsubscribe();
    }

    public options: Object = {

        title: {text: ''},
        chart: {
            zoomType: 'x', type: 'pie', height: 250,
            options3d: {
                enabled: true,
                alpha: 45,
                beta: 0
            },
            renderTo: 'graph',
        },
        credits: {enabled: false},
        colors: ["#74E1E1", "#90ED7D", "#f7a35c"],
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '<span style="text-transform: capitalize;">{point.name}</span>:{point.percentage:.1f}%'
                },
                depth: 10
            }
        },
        tooltip: {
            headerFormat: null,
            pointFormat: '<span style="color:{point.color};text-transform: capitalize">{point.name}</span>: <b> INR {point.y}</b><br/>'
        },
        series: [{
            name: '',
            colorByPoint: true,
            allowPointSelect: true,
            data: []
        }]
    };

    download() {
        /*var wrapperPdf = new CustomJspdf('p', 'pt');
         var pdf = wrapperPdf.jspdf;
         var totalPagesExp = "{total_pages_count_string}";
         var pageContent = function (data) {
         // HEADER
         pdf.setFontSize(20);
         pdf.setFontStyle('normal');
         pdf.addImage(LogoImdData, 'JPEG', data.settings.margin.left, 40, 85, 18);

         // FOOTER
         var str = "Page " + data.pageCount;
         // Total page number plugin only available in jspdf v1.0+
         if (typeof pdf.putTotalPages === 'function') {
         str = str + " of " + totalPagesExp;
         }
         pdf.setFontSize(10);
         pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 30);
         };
         pdf.setFontSize(12);
         wrapperPdf.myText("Asset Allocation", {align: "center"}, 0, 100);
         var imgData = this.chartDirective.imageUri;
         pdf.addImage(imgData, 'JPEG', 15, 150, 600, 220);
         var tableStyle = {startY: 490, addPageContent: pageContent};
         pdf.autoTable([], [], tableStyle);
         if (typeof pdf.putTotalPages === 'function') {
         pdf.putTotalPages(totalPagesExp);
         }
         pdf.save('Asset Allocation Report.pdf');*/
    }

}