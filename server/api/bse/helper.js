var config = require('../../config/environment');

exports.getMainBseObject = function (){
    return {
        "ddlStateName": [{k: "AN", v: "ANDAMAN & NICOBAR"}, {k: "AP", v: "ANDHRA PRADESH"}, {k: "AR", v: "ARUNACHAL PRADESH"}, {k: "AS", v: "ASSAM"}, {k: "BH", v: "BIHAR"},
            {k: "CG", v: "CHHATTISGARH"}, {k: "CH", v: "CHANDIGARH"}, {k: "DD", v: "DIU AND DAMAN"}, {k: "DL", v: "DELHI"}, {k: "DN", v: "DADRA AND NAGAR HAVELI"}, {k: "GO", v: "GOA"},
            {k: "GU", v: "GUJARAT"}, {k: "HA", v: "HARYANA"}, {k: "HP", v: "HIMACHAL PRADESH"}, {k: "JH", v: "JHARKHAND"}, {k: "JK", v: "JHARKHAND"}, {k: "JM", v: "JAMMU AND KASHMIR"},
            {k: "KA", v: "KARNATAKA"}, {k: "KE", v: "KERALA"}, {k: "KR", v: "JAMMU &amp; KASHMIR"}, {k: "LA", v: "LAKSHWADEEP"}, {k: "LD", v: "LAKSHADWEEP"}, {k: "MA", v: "MAHARASHTRA"},
            {k: "ME", v: "MEGHALAYA"}, {k: "MI", v: "MIZORAM"}, {k: "MN", v: "MANIPUR"}, {k: "MP", v: "MADHYA PRADESH"}, {k: "NA", v: "NAGALAND"}, {k: "ND", v: "NEW DELHI"}, {k: "NG", v: "NAGPUR"},
            {k: "OH", v: "OTHERS"}, {k: "OR", v: "ORISSA"}, {k: "PO", v: "PONDICHERRY"}, {k: "PU", v: "PUNJAB"}, {k: "RA", v: "RAJASTHAN"}, {k: "SI", v: "SIKKIM"}, {k: "SU", v: "SURAT"},
            {k: "TG", v: "TELANGANA"}, {k: "TN", v: "TAMIL NADU"}, {k: "TR", v: "TRIPURA"}, {k: "UC", v: "UTTARANCHAL"}, {k: "UL", v: "UTTARAKHAND"}, {k: "UP", v: "UTTAR PRADESH"}, {k: "WB", v: "WEST BENGAL"}],
        "ddlCountry": [{k: "001", v: "Afghanistan"}, {k: "002", v: "Aland Islands"}, {k: "003", v: "Albania"}, {k: "004", v: "Algeria"}, {k: "005", v: "American Samoa"},
            {k: "006", v: "Andorra"}, {k: "007", v: "Angola"}, {k: "008", v: "Anguilla"}, {k: "009", v: "Antarctica"}, {k: "010", v: "Antigua And Barbuda"}, {k: "011", v: "Argentina"},
            {k: "012", v: "Armenia"}, {k: "013", v: "Aruba"}, {k: "014", v: "Australia"}, {k: "015", v: "Austria"}, {k: "016", v: "Azerbaijan"}, {k: "017", v: "Bahamas"},
            {k: "018", v: "Bahrain"}, {k: "019", v: "Bangladesh"}, {k: "020", v: "Barbados"}, {k: "021", v: "Belarus"}, {k: "022", v: "Belgium"}, {k: "023", v: "Belize"},
            {k: "024", v: "Benin"}, {k: "025", v: "Bermuda"}, {k: "026", v: "Bhutan"}, {k: "027", v: "Bolivia"}, {k: "028", v: "Bosnia And Herzegovina"}, {k: "029", v: "Botswana"},
            {k: "030", v: "Bouvet Island"}, {k: "031", v: "Brazil"}, {k: "032", v: "British Indian Ocean Territory"}, {k: "033", v: "Brunei Darussalam"}, {k: "034", v: "Bulgaria"},
            {k: "035", v: "Burkina Faso"}, {k: "036", v: "Burundi"}, {k: "037", v: "Cambodia"}, {k: "038", v: "Cameroon"}, {k: "039", v: "Canada"}, {k: "040", v: "Cape Verde"}, {k: "041", v: "Cayman Islands"},
            {k: "042", v: "Central African Republic"}, {k: "043", v: "Chad"}, {k: "044", v: "Chile"}, {k: "045", v: "China"}, {k: "046", v: "Christmas Island"}, {k: "047", v: "Cocos (Keeling) Islands"},
            {k: "048", v: "Colombia"}, {k: "049", v: "Comoros"}, {k: "050", v: "Congo"}, {k: "051", v: "Congo, The Democratic Republic Of The"}, {k: "052", v: "Cook Islands"}, {k: "053", v: "Costa Rica"},
            {k: "054", v: "Cote DIvoire"}, {k: "055", v: "Croatia"}, {k: "056", v: "Cuba"}, {k: "057", v: "Cyprus"}, {k: "058", v: "Czech Republic"}, {k: "059", v: "Denmark"},
            {k: "060", v: "Djibouti"}, {k: "061", v: "Dominica"}, {k: "062", v: "Dominican Republic"}, {k: "063", v: "Ecuador"}, {k: "064", v: "Egypt"}, {k: "065", v: "El Salvador"}, {k: "066", v: "Equatorial Guinea"},
            {k: "067", v: "Eritrea"}, {k: "068", v: "Estonia"}, {k: "069", v: "Ethiopia"}, {k: "070", v: "Falkland Islands (Malvinas)"}, {k: "071", v: "Faroe Islands"},
            {k: "072", v: "Fiji"}, {k: "073", v: "Finland"}, {k: "074", v: "France"}, {k: "075", v: "French Guiana"}, {k: "076", v: "French Polynesia"}, {k: "077", v: "French Southern Territories"},
            {k: "078", v: "Gabon"}, {k: "079", v: "Gambia"}, {k: "080", v: "Georgia"}, {k: "081", v: "Germany"}, {k: "082", v: "Ghana"}, {k: "083", v: "Gibraltar"}, {k: "084", v: "Greece"},
            {k: "085", v: "Greenland"}, {k: "086", v: "Grenada"}, {k: "087", v: "Guadeloupe"}, {k: "088", v: "Guam"}, {k: "089", v: "Guatemala"}, {k: "090", v: "Guernsey"}, {k: "091", v: "Guinea"},
            {k: "092", v: "Guinea-Bissau"}, {k: "093", v: "Guyana"}, {k: "094", v: "Haiti"}, {k: "095", v: "Heard Island And Mcdonald Islands"}, {k: "096", v: "Holy See (Vatican City State)"},
            {k: "097", v: "Honduras"}, {k: "098", v: "Hong Kong"}, {k: "099", v: "Hungary"}, {k: "100", v: "Iceland"}, {k: "101", v: "India"}, {k: "102", v: "Indonesia"},
            {k: "103", v: "Iran, Islamic Republic Of"}, {k: "104", v: "Iraq"}, {k: "105", v: "Ireland"}, {k: "106", v: "Isle Of Man"}, {k: "107", v: "Israel"}, {k: "108", v: "Italy"},
            {k: "109", v: "Jamaica"}, {k: "110", v: "Japan"}, {k: "111", v: "Jersey"}, {k: "112", v: "Jordan"}, {k: "113", v: "Kazakhstan"}, {k: "114", v: "Kenya"}, {k: "115", v: "Kiribati"},
            {k: "116", v: "Korea, Democratic Peoples Republic Of"}, {k: "117", v: "Korea, Republic Of"}, {k: "118", v: "Kuwait"}, {k: "119", v: "Kyrgyzstan"}, {k: "120", v: "Lao Peoples Democratic Republic"},
            {k: "121", v: "Latvia"}, {k: "122", v: "Lebanon"}, {k: "123", v: "Lesotho"}, {k: "124", v: "Liberia"}, {k: "125", v: "Libyan Arab Jamahiriya"}, {k: "126", v: "Liechtenstein"}, {k: "127", v: "Lithuania"}, {k: "128", v: "Luxembourg"},
            {k: "129", v: "Macao"}, {k: "130", v: "Macedonia, The Former Yugoslav Republic Of"}, {k: "131", v: "Madagascar"}, {k: "132", v: "Malawi"}, {k: "133", v: "Malaysia"},
            {k: "134", v: "Maldives"}, {k: "135", v: "Mali"}, {k: "136", v: "Malta"}, {k: "137", v: "Marshall Islands"}, {k: "138", v: "Martinique"}, {k: "139", v: "Mauritania"},
            {k: "140", v: "Mauritius"}, {k: "141", v: "Mayotte"}, {k: "142", v: "Mexico"}, {k: "143", v: "Micronesia, Federated States Of"}, {k: "144", v: "Moldova, Republic Of"},
            {k: "145", v: "Monaco"}, {k: "146", v: "Mongolia"}, {k: "147", v: "Montserrat"}, {k: "148", v: "Morocco"}, {k: "149", v: "Mozambique"}, {k: "150", v: "Myanmar"},
            {k: "151", v: "Namibia"}, {k: "152", v: "Nauru"}, {k: "153", v: "Nepal"}, {k: "154", v: "Netherlands"}, {k: "155", v: "Netherlands Antilles"}, {k: "156", v: "New Caledonia"},
            {k: "157", v: "New Zealand"}, {k: "158", v: "Nicaragua"}, {k: "159", v: "Niger"}, {k: "160", v: "Nigeria"}, {k: "161", v: "Niue"}, {k: "162", v: "Norfolk Island"},
            {k: "163", v: "Northern Mariana Islands"}, {k: "164", v: "Norway"}, {k: "165", v: "Oman"}, {k: "166", v: "Pakistan"}, {k: "167", v: "Palau"}, {k: "168", v: "Palestinian Territory, Occupied"},
            {k: "169", v: "Panama"},{k: "170", v: "Papua New Guinea"},{k: "171", v: "Paraguay"},{k: "172", v: "Peru"}, {k: "173", v: "Philippines"}, {k: "174", v: "Pitcairn"},
            {k: "175", v: "Poland"},{k: "176", v: "Portugal"}, {k: "177", v: "Puerto Rico"}, {k: "178", v: "Qatar"}, {k: "179", v: "Reunion"}, {k: "180", v: "Romania"},
            {k: "181", v: "Russian Federation"}, {k: "182", v: "Rwanda"}, {k: "183", v: "Saint Helena"}, {k: "184", v: "Saint Kitts And Nevis"}, {k: "185", v: "Saint Lucia"},
            {k: "186", v: "Saint Pierre And Miquelon"}, {k: "187", v: "Saint Vincent And The Grenadines"}, {k: "188", v: "Samoa"}, {k: "189", v: "San Marino"}, {k: "190", v: "Sao Tome And Principe"},
            {k: "191", v: "Saudi Arabia"}, {k: "192", v: "Senegal"}, {k: "193", v: "Serbia And Montenegro"}, {k: "194", v: "Seychelles"}, {k: "195", v: "Sierra Leone"}, {k: "196", v: "Singapore"},
            {k: "197", v: "Slovakia"}, {k: "198", v: "Slovenia"}, {k: "199", v: "Solomon Islands"}, {k: "200", v: "Somalia"}, {k: "201", v: "South Africa"}, {k: "202", v: "South Georgia And The South Sandwich Islands"},
            {k: "203", v: "Spain"}, {k: "204", v: "Sri Lanka"}, {k: "205", v: "Sudan"}, {k: "206", v: "Suriname"}, {k: "207", v: "Svalbard And Jan Mayen"}, {k: "208", v: "Swaziland"},
            {k: "209", v: "Sweden"}, {k: "210", v: "Switzerland"}, {k: "211", v: "Syrian Arab Republic"}, {k: "212", v: "Taiwan, Province Of China"}, {k: "213", v: "Tajikistan"},
            {k: "214", v: "Tanzania, United Republic Of"}, {k: "215", v: "Thailand"}, {k: "216", v: "Timor-Leste"}, {k: "217", v: "Togo"}, {k: "218", v: "Tokelau"}, {k: "219", v: "Tonga"},
            {k: "220", v: "Trinidad And Tobago"}, {k: "221", v: "Tunisia"}, {k: "222", v: "Turkey"}, {k: "223", v: "Turkmenistan"}, {k: "224", v: "Turks And Caicos Islands"}, {k: "225", v: "Tuvalu"},
            {k: "226", v: "Uganda"}, {k: "227", v: "Ukraine"}, {k: "228", v: "United Arab Emirates"}, {k: "229", v: "United Kingdom"}, {k: "230", v: "United States of America"},
            {k: "231", v: "United States Minor Outlying Islands"}, {k: "232", v: "Uruguay"}, {k: "233", v: "Uzbekistan"}, {k: "234", v: "Vanuatu"}, {k: "235", v: "Venezuela"}, {k: "236", v: "Viet Nam"},
            {k: "237", v: "Virgin Islands, British"}, {k: "238", v: "Virgin Islands, U.S."}, {k: "239", v: "Wallis And Futuna"}, {k: "240", v: "Western Sahara"}, {k: "241", v: "Yemen"}, {k: "242", v: "Zambia"}, {k: "243", v: "Zimbabwe"}],
        "ddlTaxStatus": [{k: "01", v: "INDIVIDUAL"}, {k: "02", v: "ON BEHALF OF MINOR"}, {k: "03", v: "HUF"}, {
            k: "04",
            v: "COMPANY"
        }, {k: "05", v: "AOP"}, {k: "06", v: "PARTNERSHIP FIRM"}
            , {k: "08", v: "TRUST"}, {k: "10", v: "OTHERS"}, {k: "12", v: "DFI"}, {
                k: "21",
                v: "NRI - REPATRIABLE (NRE)"
            }, {k: "23", v: "FII"}, {k: "24", v: "NRI - REPATRIABLE (NRO)"}, {k: "47", v: "LLP"}],
        "ddlHolding": [{k: "SI", v: "SINGLE"}, {k: "JO", v: "JOINT"}, {k: "AS", v: "ANYONE OR SURVIVOR"}],
        "ddlStatus": [{k: "1", v: "ACTIVE"}, {k: "0", v: "INACTIVE"}],
        "ddlGender": [{k: "M", v: "MALE"}, {k: "F", v: "FEMALE"}],
        "ddlOccupation": [{k: "01", v: "BUSINESS"}, {k: "02", v: "SERVICE"}, {k: "03", v: "PROFESSIONAL"}, {
            k: "04",
            v: "AGRICULTURIST"
        }, {k: "05", v: "RETIRED"}, {k: "06", v: "HOUSEWIFE"}, {k: "07", v: "STUDENT"},
            {k: "08", v: "OTHERS"}, {k: "09", v: "NOT SPECIFIED"}, {k: "41", v: "PRIVATE SECTOR SERVICE"}, {
                k: "42",
                v: "PUBLIC SECTOR / GOVERNMENT SERVICE"
            }, {k: "43", v: "REX DEALER"}],
        "ddlDepository": [{k: "CDSL", v: "CDSL"}, {k: "NSDL", v: "NSDL"}],
        "ddlBankAcType1": [{k: "SB", v: "SAVINGS"}, {k: "CB", v: "CURRENT"}, {
            k: "NE",
            v: "NON-RESIDENT EXTERNAL"
        }, {k: "NO", v: "NON-RESIDENT ORDINARY"}],
        "ddlDefaulBankFlag1": [{k: "Y", v: "YES"}, {k: "N", v: "NO"}],
        "ddlCommMode": [{k: "P", v: "PHYSICAL"}, {k: "E", v: "EMAIL"}, {k: "M", v: "MOBILE"}]
    };
}

exports.getUserDetails = function (req,res) {
    var date = new Date();
    var userObject = {
        userBasic: {
            userId : ''+date.getDay()+''+date.getHours()+''+date.getMinutes()+''+date.getSeconds(),
            firstName: "Pawan",
            middleName: 'Kumar',
            lastName: 'Meena',
            pan: 'AMZPP3256A',
            panName: 'Pawan Kumar',
            fatherName: 'Bhagwan Singh Meena',
            motherName: "Naval Dei",
            contact: {email: 'b0pawan@gmail.com', mob: '9867370142', tel: '02241210020', fax: '02241210021'},
            dob: "31/03/1982",
            gender: 'M',
            maritalStatus: 'married'
        },
        userAddress: {
            currentAddress: {
                line1: 'B - 604, Gundecha Heights',
                line2: 'LBS Marg, Kanjurmarcg West',
                pin: '400078',
                city: 'Mumbai',
                district: 'Mumbai',
                state: 'MA',
                country: 'India'
            }
        },
        nominee: [{
            name: 'Himank Singh',
            relation: 'Son',
            dob: '13/03/2014',
            address: {
                line1: 'B - 604, Gundecha Heights',
                line2: 'LBS Marg, Kanjurmarcg West',
                pin: '400078',
                city: 'Mumbai',
                district: 'Mumbai',
                state: 'Maharashtra',
                country: 'India'
            }
        }],
        userBank: {holderName: 'Pawan Kumar Meena', accountType: 'SB', bank: {
            bankName: "ICICI Bank",
            IFSC: 'ICIC0000151',
            city: 'Mumbai',
            state: 'Maharasthra',
            branch: 'Vashi'
        }, accountNumber: '015101533338'},
        userFatca: {
            income: '10 lakhs',
            occupation: 'Business',
            nationality: 'Indian',
            birthCountry: 'India',
            birthCity: 'Jagjeevanpur',
            isIndianTaxPayer: 'Yes',
            taxCountry: '101',
            tin: '',
            politicallyExposed: 'No',
            politicallyRelated: 'No'
        }
    };
    return userObject;
}


//,"btnSave","btnReset",

//hdnClientID, hdnDob , hdnCurrDate , hdnDate, txtClientCode,


/*var data = [];
 $('form').find('input, textarea, select').each(function(i, field) {
 data.push(field.name);
 });
 console.log(JSON.stringify(data));*/


/*
 var selects = ["ddlBranchCode","ddlDealers","ddlTaxStatus","ddlHolding","ddlStatus","ddlGender","ddlOccupation","ddlDivPayMode","ddlClientType","ddlDepository","ddlBankAcType1","ddlDefaulBankFlag1",
 "ddlBankAcType2","ddlDefaulBankFlag2","ddlBankAcType3","ddlDefaulBankFlag3","ddlBankAcType4","ddlDefaulBankFlag4","ddlBankAcType5","ddlDefaulBankFlag5","ddlStateName","ddlCommMode","ddlCountry"];

 var inputs = ["hdnClientID","hdnDob","hdnCurrDate","hdnDate","txtClientCode","txtMemberId","txtApplicant1","txtDate","txtApplicant2","txtApplicant3","txtFatherName","txtNominee","txtRelationship",
 "txtMAPINNo","txtPAN1","txtPAN2","txtPAN3","txtGuardianPan","txtCdslBen","txtNsdlDP","txtNsdlBen","txtAccNo1","txtIFSCCode","txtMicrNo1","txtBankName1","txtBankBranch1","txtAccNo2","txtNeftCode2",
 "txtMicrNo2","txtBankName2","txtBankBranch2","txtAccNo3","txtNeftCode3","txtMicrNo3","txtBankName3","txtBankBranch3","txtAccNo4","txtNeftCode4","txtMicrNo4","txtBankName4","txtBankBranch4",
 "txtAccNo5","txtNeftCode5","txtMicrNo5","txtBankName5","txtBankBranch5","txtChequeName","txtAdd1","txtAdd2","txtAdd3","txtCity","txtPinCode","txtCountry","txtResPhone","txtResFax","txtOffPhone","txtOffFax",
 "txtEmail","txtMobile","txtForAdd1","txtForAdd2","txtForAdd3","txtForCity","txtForPin","txtForState","txtForResPhone","txtForResFax","txtForOffPhone","txtForOffFax","btnSave","btnReset","hdnMFD","hdnBankCity1",
 "hdnBankCity2","hdnBankCity3","hdnBankCity4","hdnBankCity5"];
 */

