export const ValidationMessages =
    {
        /**************BASIC SECTION**********************************/
        'panName': {
            'required': 'Please enter your name',
            'pattern': 'Please enter correct name as per PAN card'
        },
        'fatherName': {
            'required': 'Please enter father/spouse name',
            'pattern': 'Name does not seem to be correct'
        },
        'motherName': {
            'required': 'Please enter mother name',
            'pattern': 'Name does not seem to be correct'
        },
        'pan':{
            'required': 'PAN number is required',
            'inValidPANFormat': 'Please enter valid PAN number'
        },
        'email':{
            'required': 'Email id is required',
            'inValidMailFormat': 'Please enter valid email id'
        },
        'mob':{
            'required': 'Mobile number is required',
            'pattern': 'Invalid number'
        },
        'dob':{
            'required': 'Please provide date of birth',
            'isInvestorAdult': 'Investor should be at least 18 years old',
            'isInvestorTooOld': 'DOB is possibly incorrect, please check again'
        },
        'gender':{
            'required': 'Please select gender'
        },
        'maritalStatus':{
            'required': 'Please select marital status'
        },
        'tel':{
            'pattern': 'Invalid number'
        },
        'fax':{
            'pattern': 'Invalid number'
        },


        /*******************ADDRESS SECTION*******************************/
        'address1': {
            'required': 'Please enter your address',
            'maxlength': 'Maximum limit is 40 characters'
        },
        'address2': {
            'maxlength': 'Maximum limit is 70 characters'
        },
        'addressType': {
            'required': 'Select address type'
        },
        'pin':{
            'required': 'Pin code is required',
            'pattern': 'Please enter valid 6 digit Pin code'
        },
        'city': {
            'required': 'Please enter the city'
        },
        'district': {
            'required': 'Please enter district'
        },
        'state': {
            'required': 'Please enter the state'
        },
        'country': {
            'required': 'Please enter country'
        },

        /********************BANK SECTION***********************************/
        'holderName': {
            'required': 'Please enter account holder\'s name',
            'pattern': 'Please enter correct name as per chequebook/passbook'
        },
        'accountType': {
            'required': 'Please select account type'
        },
        'account': {
            'mismatch': 'Account numbers do not match'
        },
        'accountNumber': {
            'required': 'Please enter account number'
        },
        'confirmAccountNumber': {
            'mismatch': 'Account numbers do not match'
        },


        /**************************FATCA SECTION******************************/
        'income': {
            'required': 'Please select income range'
        },
        'occupation': {
            'required': 'Please select occupation'
        },
        'sourceOfWealth': {
            'required': 'Please select source of wealth'
        },
        'nationality': {
            'required': 'Please select your nationality'
        },
        'birthCountry': {
            'required': 'Please select birth country'
        },
        'taxCountry': {
            'required': 'Please select tax country'
        },
        'birthCity': {
            'required': 'Please enter birth city'
        },

        /*************************Nominee*************************/
        'nomineeName': {
            'required': 'Please enter nominee name',
            'pattern': 'Name does not seem to be correct'
        },
        'nomineeRelation': {
            'required': "Please mention your relationship with nominee"
        },
        'nomineeDob': {
            'required': 'Please provide date of birth',
            'isNomieeBorn': 'Future date not allowed',
            'isInvestorTooOld': 'DOB is possibly incorrect, please check again'
        }
    };
