/**
 * Created by Fincash on 23-01-2017.
 */

require('chromedriver');
var dateFormat = require('dateformat'),
    config = require('../../config/environment'),
    helper = require('./helper'),
    http = require('http'),
    express = require('express'),
    bodyParser = require('body-parser'),
    webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    Keys = webdriver.Key,
    until = webdriver.until,
    equals = webdriver.equals;

exports.clientRegistration = function (req, res) {
    var driver = new webdriver.Builder().forBrowser('chrome').build();
    var errorHandler = function errorHandling(error) {
        res.json({success: false, msg: error});
        driver.quit();
    }
    driver.manage().deleteAllCookies();
    driver.manage().window().maximize();
    driver.navigate().to(config.bsePanel.url).then(function () {
        driver.wait(until.elementLocated(By.id('btnLogin')), 60 * 1000).then(function () {
            driver.findElement(By.id("txtUserId")).sendKeys('' + config.bsePanel.usename);
            driver.findElement(By.id("txtMemberId")).sendKeys('' + config.bsePanel.memberid);
            driver.findElement(By.id("txtPassword")).sendKeys('' + config.bsePanel.passwd);
            driver.findElement(By.id("btnLogin")).sendKeys(Keys.ENTER);
            driver.wait(until.elementLocated(By.id('divServerTime')), 60 * 1000).then(function () {
                driver.navigate().to(config.bsePanel.url + '/ClientMaster.aspx').then(function () {
                    // client registration form
                    processForm(req, res, helper.getUserDetails(req, res), driver);
                }, errorHandler);
            }, errorHandler);
        }, errorHandler);
    }, errorHandler);
};

function processForm(req, res, userDetails, driver) {
    var errorHandler = function errorHandling(error) {
        res.json({success: false, msg: error});
        driver.quit();
    };
    var mainObject = helper.getMainBseObject();
    var dselects = [{id: "ddlBranchCode", value: {k: "CORPBRANCH", v: "CORPBRANCH"}}, {
        id: "ddlDivPayMode",
        value: {k: "02", v: "DIRECT CREDIT"}
    }, {id: "ddlClientType", value: {k: "P", v: "PHYSICAL"}},
        {id: "ddlCommMode", value: {k: "E", v: "EMAIL"}}, {id: "ddlCKYC", value: {k: "N", v: "NO"}}];
    var selects = ["ddlTaxStatus", "ddlHolding", "ddlStatus", "ddlGender", "ddlOccupation", "ddlBankAcType1", "ddlDefaulBankFlag1", "ddlDefaulBankFlag2", "ddlDefaulBankFlag3", "ddlDefaulBankFlag4", "ddlDefaulBankFlag5", "ddlStateName", "ddlCountry"];
    var i = 0;
    for (var field in dselects) {
        setTimeout(function (_field) {
            var fieldId = _field.id;
            var fieldValue = _field.value;
            var fieldJqueryStr = "$('#" + fieldId + "')";
            // var fireStatement = "\""+fieldJqueryStr+".val('"+fieldValue.k+"');"+fieldJqueryStr+".trigger('change');\"";
            var fireStatement = fieldJqueryStr + ".val('" + fieldValue.k + "');";
            console.log(fireStatement);
            driver.executeScript(fireStatement).then(function () {

            }, errorHandler);
        }.bind(this, dselects[field]), i++ * 1);
    }
    var j = 0;
    for (var field in selects) {
        setTimeout(function (_field) {
            var fieldValues = mainObject[_field];
            var fieldValue;
            if (_field == 'ddlTaxStatus') {
                fieldValue = fieldValues[0].k;
            } else if (_field == 'ddlHolding') {
                fieldValue = fieldValues[0].k;
            } else if (_field == 'ddlStatus') {
                fieldValue = fieldValues[0].k;
            } else if (_field == 'ddlGender') {
                fieldValue = userDetails.userBasic.gender;
            } else if (_field == 'ddlOccupation') {
                // 08 - others
                fieldValue = '08';
            } else if (_field == 'ddlBankAcType1') {
                fieldValue = userDetails.userBank.accountType;
            } else if (_field == 'ddlDefaulBankFlag1') {
                fieldValue = 'Y';
            } else if (_field == 'ddlStateName') {
                fieldValue = userDetails.userAddress.currentAddress.state;
            } else if (_field == 'ddlCountry') {
                fieldValue = userDetails.userFatca.taxCountry;
            }
            if (fieldValue) {
                //var defaultfield = fieldValues[0];
                var fieldJqueryStr = "$('#" + _field + "')";
                // var fireStatement = "\""+fieldJqueryStr+".val('"+fieldValue.k+"');"+fieldJqueryStr+".trigger('change');\"";
                var fireStatement = fieldJqueryStr + ".val('" + fieldValue + "');";
                console.log(fireStatement);
                driver.executeScript(fireStatement).then(function () {

                }, errorHandler);
            }
        }.bind(this, selects[field]), j++ * 1);
    }

    var inputs = ["hdnClientID", "txtClientCode", "txtMemberId", "txtApplicant1", "txtDate", "txtApplicant2", "txtApplicant3", "txtFatherName", "txtNominee", "txtRelationship", "txtMAPINNo", "txtPAN1", "txtPAN2", "txtPAN3",
        "txtGuardianPan", "txtCdslBen", "txtNsdlDP", "txtNsdlBen", "txtAccNo1", "txtMicrNo1", "txtBankName1", "txtBankBranch1", "txtChequeName", "txtAdd1", "txtAdd2", "txtAdd3", "txtCity", "txtPinCode",
        "txtCountry", "txtResPhone", "txtResFax", "txtOffPhone", "txtOffFax", "txtEmail", "txtMobile", "txtNominee", "txtRelationship", "txtIFSCCode"];

    //"btnSave","btnReset"
    // hiddens "hdnMFD" "hdnBankCity1", "hdnBankCity2","hdnBankCity3","hdnBankCity4","hdnBankCity5,"hdnClientID","hdnDob","hdnCurrDate","hdnDate"

    var k = 0;
    for (var field in inputs) {
        setTimeout(function (_field) {
            var fieldValue;
            if (_field == 'hdnClientID') {
                fieldValue = userDetails.userBasic.userId;
            } else if (_field == 'txtClientCode') {
                fieldValue = userDetails.userBasic.userId;
            } else if (_field == 'txtMemberId') {
                fieldValue = config.bsePanel.memberid;
            } else if (_field == 'txtApplicant1') {
                fieldValue = userDetails.userBasic.panName;
            } else if (_field == 'txtApplicant1') {
                fieldValue = userDetails.userBasic.panName;
            } else if (_field == 'txtFatherName') {
                fieldValue = userDetails.userBasic.fatherName;
            } else if (_field == 'txtPAN1') {
                fieldValue = userDetails.userBasic.pan;
            } else if (_field == 'txtAccNo1') {
                fieldValue = userDetails.userBank.accountNumber;
            } else if (_field == 'txtIFSCCode') {
                fieldValue = userDetails.userBank.bank.IFSC;
            } else if (_field == 'txtBankName1') {
                fieldValue = userDetails.userBank.bank.bankName;
            } else if (_field == 'txtBankBranch1') {
                fieldValue = userDetails.userBank.bank.branch;
            } else if (_field == 'txtAdd1') {
                fieldValue = userDetails.userAddress.currentAddress.line1;
            } else if (_field == 'txtAdd2') {
                fieldValue = userDetails.userAddress.currentAddress.line2;
            } else if (_field == 'txtCity') {
                fieldValue = userDetails.userAddress.currentAddress.city;
            } else if (_field == 'txtPinCode') {
                fieldValue = userDetails.userAddress.currentAddress.pin;
            } else if (_field == 'txtCountry') {
                fieldValue = userDetails.userAddress.currentAddress.country;
            } else if (_field == 'txtEmail') {
                fieldValue = userDetails.userBasic.contact.email;
            } else if (_field == 'txtMobile') {
                fieldValue = userDetails.userBasic.contact.mob;
            } else if (_field == 'txtNominee') {
                fieldValue = userDetails.nominee[0].name;
            } else if (_field == 'txtRelationship') {
                fieldValue = userDetails.nominee[0].relation;
            } else if (_field == 'txtDate') {
                dateFormat.masks.dobTime = 'dd mmm yyyy';
                var dobA = userDetails.userBasic.dob.split('/');
                var dob = new Date(parseInt(dobA[2]), parseInt(dobA[1]) - 1, parseInt(dobA[0]), 0, 0, 1);
                fieldValue = dateFormat(dob, 'dobTime');
                console.log(fieldValue);
            }

            if (fieldValue) {
                var fieldJqueryStr = "$('#" + _field + "')";
                // var fireStatement = "\""+fieldJqueryStr+".val('"+fieldValue.k+"');"+fieldJqueryStr+".trigger('change');\"";
                var fireStatement = fieldJqueryStr + ".val('" + fieldValue + "');";
                console.log(fireStatement);
                if (_field == 'txtIFSCCode') {
                    fireStatement = fireStatement + fieldJqueryStr + ".trigger('change');";
                    setTimeout(function (_fireStatement) {
                        console.log('Setting bank >>> ' + _fireStatement);
                        driver.executeScript(_fireStatement).then(function () {
                            driver.wait(until.elementLocated(By.name('ddlDefaulBankFlag1')), 60 * 1000).then(function (elm) {
                                elm.sendKeys('Y');
                                driver.findElement(By.id("btnSave")).sendKeys(Keys.ENTER).then(function () {
                                    console.log("user form submitted");
                                    driver.wait(until.alertIsPresent, 60 * 1000).then(function () {
                                        driver.switchTo().alert().getText().then(function (alert) {
                                            console.log("["+alert +"] for user id [" + userDetails.userBasic.userId+"]");
                                            if (alert && alert.toLowerCase() == 'client added successfully.') {
                                                res.json({success: true, msg: alert});
                                                driver.quit();
                                            } else {
                                                res.json({success: false, msg: alert});
                                                driver.quit();
                                            }
                                        }, errorHandler);
                                    }, errorHandler)
                                }, errorHandler);
                            }, errorHandler);
                        });
                    }.bind(this, fireStatement), 1000);
                } else {
                    driver.executeScript(fireStatement).then(function () {
                    }, errorHandler);
                }
            }
        }.bind(this, inputs[field]), k++ * 1);
    }
}

//module.exports = router;