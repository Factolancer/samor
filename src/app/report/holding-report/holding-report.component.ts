import {Component, OnInit, OnDestroy, ViewContainerRef} from "@angular/core";
import {Subscription} from "rxjs/Subscription";

import {HoldingReportService} from "./holding-report.service";
import {HoldingFilter, Holdings} from "./holdings";
import {ReportService} from "../report.service";
import {LogoImdData} from "../constants";
import {isNullOrUndefined} from "util";
import {CustomJspdf} from "../transaction-report/jsPDFext";
import {disclaimers} from "../../../properties/discalimers";
import {ReportNumberPipe} from "../../shared/report-number.pipe";
import {Logger} from "../../core/logger/logger";
import {Redemption} from "../../redemption/models/redemption";
import {RedemptionFund} from "../../redemption/models/redemption-fund";
import {FundOption} from "../../models/fund-option";
import {RedemptionService} from "../../core/services/redemption.service";
import {SnackBarService} from "../../core/services/snack-bar.service";
import {DatePipe} from "../../shared/date.pipe";
import {CartService} from "../../core/services/cart.service";
import {Fund} from "../../models/fund";
import {InvestmentModeEnum} from "../../enum/investment-mode-enum";
import {LoadingDialogComponent} from "../../shared/loading-dialog.component";
import {MdDialogConfig, MdDialog} from "@angular/material";
import {HeaderService} from "../../core/services/header.service";
import {Router} from "@angular/router";

//declare let jsPDF;

@Component({
    selector: 'app-holding-report',
    templateUrl: './holding-report.component.html',
    styleUrls: ['../report.styles.scss'],
    providers: [HoldingReportService]
})
export class HoldingReportComponent implements OnInit, OnDestroy {
    funds: Holdings[];
    currentDate: Date;
    holdingTabSubscription: Subscription;
    className: string;
    defaultInvestmentMode: InvestmentModeEnum;
    emptyHolding: boolean;
    downloadAfterLoading: boolean;
    loadingDialogRef: any;
    closingDialogSubscription: Subscription;

    constructor(private holdingReportService: HoldingReportService, private cartService: CartService,
                private reportService: ReportService, private logger: Logger, public headerService: HeaderService,
                private redemptionService: RedemptionService, private snackBarService: SnackBarService,
                public dialog: MdDialog, private viewContainerRef: ViewContainerRef, private router: Router) {
        this.className = "HoldingReportComponent";
        this.downloadAfterLoading = false;
    }

    snackBarSubscription: Subscription;

    ngOnInit() {
        this.holdingTabSubscription = this.reportService.holdingTabResult.subscribe((loadTab: boolean) => {
            if (loadTab == true) {
                this.currentDate = new Date();
                let holdingFilter = new HoldingFilter;
                this.emptyHolding = true;
                this.filterHoldings()
            } else {
                this.funds = [];
            }
        });
        this.defaultInvestmentMode = InvestmentModeEnum.LUMPSUM;

    }

    filterHoldings() {
        let holdingFilter = new HoldingFilter;
        holdingFilter.emptyHolding = this.emptyHolding;
        this.showLoadingDialog();
        this.holdingReportService.getHoldings(holdingFilter)
            .subscribe(funds => {
                this.funds = funds as Holdings[];
                this.closingDialogSubscription = this.loadingDialogRef.afterClosed().subscribe(value => {
                });
                this.closeLoadingDialog();
                /*to start download after loading data in mobile view on single click*/
                if (this.downloadAfterLoading) {
                    this.download();
                }
            }, error => {
                this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                this.closeLoadingDialog();
            });
    }

    showTransactionDetails(fundId: number) {

        this.reportService.setFundIndexResult(fundId);
    }

    showLoadingDialog() {
        let config = new MdDialogConfig();
        let device = this.headerService.deviceType();
        if (device === 'xs' || device === 'sm') {
            config.width = '100%';
        } else {
            config.width = '25vw';
        }
        config.disableClose = true;
        config.viewContainerRef = this.viewContainerRef;
        let loadingConfig = {
            text: "Processing..."
        };
        this.loadingDialogRef = this.dialog.open(LoadingDialogComponent, config);
        this.loadingDialogRef.componentInstance.config = loadingConfig;

    }

    closeLoadingDialog() {
        if (this.loadingDialogRef) {
            this.loadingDialogRef.close();
        }
    }

    ngOnDestroy() {
        if (this.holdingTabSubscription) {
            this.holdingTabSubscription.unsubscribe();
        }

        if (this.closingDialogSubscription) {
            this.closingDialogSubscription.unsubscribe();
        }

        if (this.snackBarSubscription) {
            this.snackBarSubscription.unsubscribe();
        }
    }

    addToRedemptionList(fund: Holdings) {
        let soptrfnum = fund.id;
        let plan = fund.plan;
        let option = new FundOption(soptrfnum, fund.name, fund.plan, fund.divFreq, fund.divOption, true, 100, true, [], 100, 100);
        let folioNo = fund.folioNo;
        let holdingMode = fund.modeOfHolding;
        let totalUnits = fund.units;
        // let redeemableUnits = fund.units;
        let currValue = fund.currValue;
        let currNav = fund.currNav;
        let navDate = fund.navDate;

        let redData = this.redemptionService.redemptionData.getValue();
        let redDataNew = (<any>Object).assign(redData); //Object.create(redData);

        // Check if the fund already exists in the list
        let values = redDataNew.fundsData.filter(x => (x.option.soptRfnum == soptrfnum && x.folioNo == folioNo));
        this.logger.debug("NEW REDDATA ", redDataNew);
        if (!isNullOrUndefined(values) && values.length > 0) {
            this.snackBarService.showSnackBar("Fund is already added for redemption", "OKAY", this.viewContainerRef);
        }
        else {
            this.holdingReportService.getFundObject(soptrfnum, folioNo, holdingMode, totalUnits)
                .subscribe(data => {
                    // let fund = data['fundObj'];
                    let fundId = data['fundId'];
                    let fundName = data['fundName'];
                    let redeemableUnits = data['redeemableUnits'];
                    let redemptionAllowed = data['redemptionAllowed'];
                    let minQuantity = data['minQuantity'];
                    let minAmount = data['minAmount'];
                    let quantityMultiple = data['quantityMultiple'];
                    let amountMultiple = data['amountMultiple'];
                    let redFund = new RedemptionFund(fundId, fundName, plan, option, folioNo, holdingMode, "", 0, true, false, totalUnits,
                        redeemableUnits, currValue, currNav, navDate, redemptionAllowed, minQuantity, minAmount, quantityMultiple, amountMultiple);
                    if (redeemableUnits > 0) {
                        // Push fund in the list
                        redData.fundsData.push(redFund);
                        this.redemptionService.redemptionData.next(redData);
                        this.logger.debug(this.className, this.redemptionService.redemptionData.getValue());
                    }
                    else {
                        if (totalUnits == 0) {
                            this.snackBarService.showSnackBar("There are no units in this fund to Redeem.", "OKAY", this.viewContainerRef);
                        } else {
                            this.snackBarService.showSnackBar("Currently, Redemption is not allowed in this fund.", "OKAY", this.viewContainerRef);
                        }
                    }
                }, error => {
                    this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                });
        }
    }

    addToCart(fundId: number) {
        this.holdingReportService.checkPurchaseAllowed(fundId).subscribe(purchaseRes => {
            if (!isNullOrUndefined(purchaseRes) && purchaseRes['PurchaseAllowed']) {
                this.holdingReportService.getFundById(fundId).subscribe(res => {
                    let fundObjList = res as Fund[];

                    for (let fundObj of fundObjList) {
                        fundObj.investmentMode = InvestmentModeEnum[this.defaultInvestmentMode]
                        fundObj.defaultSopt = fundId;
                    }
                    this.cartService.addFundToCart(fundObjList).subscribe(res => {
                        this.snackBarSubscription = this.snackBarService.showSnackBar(res.message, "Checkout",
                            this.viewContainerRef).onAction().subscribe(() => {
                            this.router.navigate(["/cart"]);
                        })
                    }, error => {
                        this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                    });
                }, error => {
                    this.snackBarService.showSnackBar("Error Occurred, Please Refresh", "Okay", this.viewContainerRef);
                })
            } else {
                this.snackBarService.showSnackBar("Purchase not allowed in this scheme", "Okay", this.viewContainerRef);
            }
        });

    }

    prepareDownload() {
        this.downloadAfterLoading = true;
        this.defaultInvestmentMode = InvestmentModeEnum.LUMPSUM;
        this.currentDate = new Date();
        let holdingFilter = new HoldingFilter;
        this.emptyHolding = false;
        this.filterHoldings();
    }

    download() {

        var columns = [{title: "Scheme", dataKey: "name"},
            {title: "Cost Value", dataKey: "costValue"},
            {title: "Units", dataKey: "units"},
            {title: "NAV\nAs On", dataKey: "currNav"},
            {title: "Current Value", dataKey: "currValue"},
            {title: "Realized Gain/Loss", dataKey: "realizedGain"},
            {title: "Unrealized Gain/Loss", dataKey: "unrealizedGain"},
            {title: "Absolute Return(%)", dataKey: "absoluteReturn"}];

        var rows = [];

        for (let fund of this.funds) {
            let costValue: string = "";
            let units: string = "";
            let currNav: string = "";
            let currValue: string = "";
            let realizedGain: string = "";
            let unrealizedGain: string = "";
            let absoluteReturn: string = "";
            let folioNo: string = "";
            let navDate: string = "";

            var options = {
                year: "numeric", month: "2-digit",
                day: "2-digit"
            };

            if (!isNullOrUndefined(fund.costValue)) {
                costValue = new ReportNumberPipe("en-US").transform(fund.costValue)
            }
            if (!isNullOrUndefined(fund.units)) {
                units = new ReportNumberPipe("en-US").transform(fund.units)
            }
            if (!isNullOrUndefined(fund.currNav)) {
                currNav = new ReportNumberPipe("en-US").transform(fund.currNav)
            }
            if (!isNullOrUndefined(fund.navDate)) {
                navDate = new DatePipe().transform(fund.navDate)
            }
            if (!isNullOrUndefined(fund.currValue)) {
                currValue = new ReportNumberPipe("en-US").transform(fund.currValue)
            }
            if (!isNullOrUndefined(fund.realizedGain)) {
                realizedGain = new ReportNumberPipe("en-US").transform(fund.realizedGain)
            }
            if (!isNullOrUndefined(fund.unrealizedGain)) {
                unrealizedGain = new ReportNumberPipe("en-US").transform(fund.unrealizedGain)
            }
            if (!isNullOrUndefined(fund.absoluteReturn)) {
                absoluteReturn = new ReportNumberPipe("en-US").transform(fund.absoluteReturn)
            }

            rows.push({
                name: fund.name, costValue: costValue, units: units, currNav: currNav,
                currValue: currValue, realizedGain: realizedGain, unrealizedGain: unrealizedGain,
                absoluteReturn: absoluteReturn
            });
        }
        var wrapperPdf = new CustomJspdf('p', 'pt');
        var pdf = wrapperPdf.jspdf;
        var totalPagesExp = "{total_pages_count_string}";
        var pageContent = function (data) {
            // HEADER
            pdf.setFontSize(20);
            pdf.setFontStyle('normal');
            pdf.addImage(LogoImdData, 'JPEG', data.settings.margin.left, 40, 85, 18);
            // FOOTER
            var str = "Page " + data.pageCount;
            if (typeof pdf.putTotalPages === 'function') {
                str = str + " of " + totalPagesExp;
            }
            pdf.setFontSize(10);
            pdf.text(str, data.settings.margin.left, pdf.internal.pageSize.height - 15);
        };
        pdf.setFontSize(12);
        wrapperPdf.myText("Mutual Fund Holdings as on " + new DatePipe().transform(this.currentDate), {align: "center"}, 0, 100);
        var currentpage = 0;
        var addHeaderFooter = function () {
            // HEADER
            pdf.setFontSize(20);
            pdf.setTextColor(40);
            pdf.setFontStyle('normal');
            pdf.addImage(LogoImdData, 'JPEG', 40, 40, 85, 18);
            // FOOTER
            if (currentpage < pdf.internal.getNumberOfPages()) {
                var str = "Page " + pdf.internal.getNumberOfPages();
                if (typeof pdf.putTotalPages === 'function') {
                    str = str + " of " + totalPagesExp;
                }
                pdf.setFontSize(10);
                pdf.setFontStyle('normal');
                pdf.text(str, 40, pdf.internal.pageSize.height - 15);
                currentpage = pdf.internal.getNumberOfPages();
            }
        };
        var funds = this.funds;
        var tableStyle = {
            margin: {top: 90},
            startY: 150,
            styles: {overflow: 'linebreak'},
            columnStyles: {
                name: {columnWidth: 165},
                costValue: {columnWidth: 45},
                units: {columnWidth: 45},
                currNav: {columnWidth: 50},
                currValue: {columnWidth: 60},
                realizedGain: {columnWidth: 50},
                unrealizedGain: {columnWidth: 58},
                absoluteReturn: {columnWidth: 48}
            },
            headerStyles: {cellPadding: {vertical: 7}, fontSize: 8},
            addPageContent: pageContent,
            bodyStyles: {cellPadding: {vertical: 6}, fontSize: 8, valign: 'middle'},
            drawCell: function (cell, data) {
                if (data.row.index == rows.length - 1) {
                    pdf.setFontStyle('bold');
                } else {
                    data.row.height = 40;
                    var fund = funds[data.row.index];

                    if (data.column.dataKey === 'name') {
                        if (data.row.index % 2 === 0) {
                            pdf.setFillColor(245, 245, 245);
                        } else {
                            pdf.setFillColor(255, 255, 255);
                        }
                        pdf.rect(cell.x, cell.y, data.table.width, 40, 'F');
                        pdf.autoTableText(rows[data.row.index].name, cell.x + 5, cell.y + 15, {
                            halign: 'left',
                            valign: 'bottom'
                        });
                        var planDetails;
                        var planOption = "";


                        var option = "Option - " + fund.divOption;
                        if ((fund.plan != null && fund.plan != undefined ) || (fund.divFreq != null && fund.divFreq != undefined)) {
                            planDetails = "Plan - ";
                            if ((fund.divFreq != null && fund.divFreq != undefined)) {
                                planDetails += fund.divFreq + " ";
                            }
                            if ((fund.plan != null && fund.plan != undefined)) {
                                planDetails += fund.plan;
                            }
                        }
                        if (planDetails != null && planDetails != undefined) {
                            planOption = planDetails + ", " + option;
                        }
                        pdf.autoTableText(planOption + '', cell.x + 5, cell.y + 25, {
                            halign: 'left',
                            valign: 'bottom'
                        });
                        var folioNo = "";
                        if (fund.folioNo != null && fund.folioNo != undefined) {
                            folioNo = "Folio No.- " + fund.folioNo
                        }
                        pdf.setFontSize(7);
                        pdf.setFontStyle('italic');
                        pdf.autoTableText(folioNo + '', cell.x + 5, cell.y + 35, {
                            halign: 'left',
                            valign: 'bottom'
                        });
                        return false;
                    }

                    if (data.column.dataKey === 'currNav') {
                        var currNav = "";
                        var navDate = "";
                        if ((fund.currNav != null && fund.currNav != undefined )) {
                            currNav = new ReportNumberPipe("en-US").transform(fund.currNav)
                        }
                        if ((fund.navDate != null && fund.navDate != undefined )) {
                            navDate = new DatePipe().transform(fund.navDate)
                        }
                        pdf.autoTableText(currNav, cell.x + 5, cell.y + 20, {
                            halign: 'left',
                            valign: 'bottom'
                        });
                        pdf.setFontSize(7);
                        pdf.setFontStyle('italic');
                        pdf.autoTableText(navDate, cell.x + 5, cell.y + 30, {
                            halign: 'left',
                            valign: 'bottom'
                        });
                        return false;
                    }
                }

            }
        };
        pdf.autoTable(columns, rows, tableStyle);
        pdf.addPage();
        addHeaderFooter();
        pdf.setFontSize(8);
        pdf.setFontStyle('normal');
        var splitTitle = pdf.splitTextToSize(`${disclaimers.report_1}` + "\n\n" + `${disclaimers.report_2}`, 515);
        pdf.text("Disclaimers:", 40, 100);
        pdf.text(40, 110, splitTitle);
        if (typeof pdf.putTotalPages === 'function') {
            pdf.putTotalPages(totalPagesExp);
        }
        pdf.save('Holding Report.pdf');
    }

    getPlanOption(fund: Holdings) {
        let planDetails: string;
        let option: string = "Option - " + fund.divOption;
        if (!isNullOrUndefined(fund.plan) || !isNullOrUndefined(fund.divFreq)) {
            planDetails = "Plan - ";
            if (!isNullOrUndefined(fund.divFreq)) {
                planDetails += fund.divFreq + " ";
            }
            if (!isNullOrUndefined(fund.plan)) {
                planDetails += fund.plan;
            }
        }
        if (!isNullOrUndefined(planDetails)) {
            return planDetails + ", " + option;
        } else {
            return ""
        }
    }
}
