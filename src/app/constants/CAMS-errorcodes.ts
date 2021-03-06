export const CamsErrorCodes = {
    KS100: "KYC Already completed. Investor transaction can be continued.",
    KS101: "KYC record not available. eKYC can be done",
    KS102: "KYC status is incomplete, please update KYC with your current KRA through Point of Service of any Intermediary",
    KS999: "Connectivity to a KRA is not available for KYC Status verification. Please try after some time.",

    'EK-100': "Insufficient input parameters",
    'EK-101': "Invalid Login credentials",
    'EK-102': "Gender option, but application configured for no Bio-Metric",
    'EK-103': "Mobile number and Aadhaar mismatch with UIDAI",
    'EK-104': "eSign failure with eMudhra, Please retry after some time",
    'EK-105': "Invalid PAN provided – Income Tax Department",
    'EK-106': "PAN verification service failure",
    'EK-107': "Given Aadhaar number already registered in KYC",
    'EK-108': "Invalid Intermediary ID provided",
    'EK-114': "If both email id and mobile number is mismatch with UIDAI",
    'EK-116': "The mobile number or email id provided is not verified with Aadhaar. Please verify and then continue with eKYC",
    'EK-117': "Aadhaar number does not have both email id and mobile number registered. Hence eKYC cannot be done",
    'EK-999': "Internal Error, Please try after some time.",

    'A401': "Aadhaar cancelled being a duplicate. Please use valid Aadhaar.",
    'A402': "Aadhaar cancelled due to disputed enrolment. Please re-enrol if you don’t have a valid Aadhaar.",
    'A403': "Aadhaar cancelled due to technical Issues. Please contact UIDAI contact centre.",
    'A404': "Aadhaar cancelled due to disputed enrolment (BE). Please re-enrol if you don’t have a valid Aadhaar.",
    'A405': "Aadhaar cancelled due to errorneous enrolment (Iris). Please re-enrol if you don’t have a valid Aadhaar.",
    'A301': "Aadhaar suspended due to inactivity. Please follow the Reactivation process.",
    'A302': "Aadhaar suspended due to Biometrics integrity issue. Please visit Permanent Enrolment Centre with document proofs for update.",
    'A303': "Aadhaar suspended due to Demographic integrity issue. Please visit Permanent Enrolment Centre / UIDAI website with document proofs for update.",
    'A304': "Aadhaar suspended due to Address dispute. Please visit Permanent Enrolment Centre with document proofs for update.",
    'A305': "Aadhaar suspended due to Photo dispute. Please visit Permanent Enrolment Centre with document proofs for update.",
    'A306': "Aadhaar suspended due to Age dispute. Please update the age.",
    'A307': "Aadhaar suspended since child has not updated biometrics after age of 5. Please update the biometrics.",
    'A308': "Aadhaar suspended since resident has not updated biometrics after age of 15. Please update the biometrics.",
    'A309': "Aadhaar is locked by resident. Please follow the Unlocking process.",
    'A201': "Aadhaar number is incorrect. Please use correct Aadhaar.",
    'A202': "Authentication temporarily not available, please retry after sometime."
};
