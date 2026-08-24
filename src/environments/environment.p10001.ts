export const environment = {
    production: true, xAPIKey: "cd3509e4-9848-4f70-9047-ce26bdd367ag",
    identityServerUrl: "https://api-dev-idp.ncorepro.com",
    apiMastersUrl: "https://api-dev-cloudbytes.ncorepro.com",
    apiAcademicsUrl: "https://api-dev-mindspark.ncorepro.com",
    apiExaminationsUrl: "https://api-dev-knowledgestand.ncorepro.com",
    apiAccountsUrl: "https://api-dev-finpro.ncorepro.com",
    apiLeadsUrl: "https://api-dev-bigleads.ncorepro.com",
    apiStudentsUrl: "https://api-dev-students.ncorepro.com",
    apiHumanResourcesUrl: "https://api-dev-smallbizgurus.ncorepro.com",
    apiTimeClockPlusUrl: "https://api-dev-timeclockplus.ncorepro.com",
    apiDigitalFingersUrl: "https://api-dev-digitalfingers.ncorepro.com",
    apiExecutiveEdgeUrl: "https://api-dev-executiveedge.ncorepro.com",
    apiSignalRUrl: "https://api-dev-signalr.ncorepro.com",
    apiFilemanagerUrl: "https://api-dev-filemanager.ncorepro.com",
    apiVirtualLearnUrl: "https://api-dev-virtuallearn.ncorepro.com",
    apiGlobalUrl: "https://api-dev-global.ncorepro.com",

    partner: {
        id: 2,
        name: "TEST UNIVERSITY",
        shortName: "TEST",
        title: "TEST UNIVERSITY",
        city: "RANCHI",
        address: "Birla Knowledge City, PO - Mahilong, Purulia Rd, Ranchi, Jharkhand, 835103",
        description: "TEST UNIVERSITY",
        partnerCode: "P10001",
        logo_url: "https://api-dev-fileserver.ncorepro.com/Development/P10001/Resources/Images/Websites/LoginPagePartnerImage/4cdxZXDxyzM92JSDznBZM8zwequalsequals.png",
        sloganText: "Transforming Global Leaders for Social and Economic Change",
        supportEmailId: "itsupport@pyxisblu.com",
        alertMessage: "",
        razorPay: {
            apiKey: "rzp_live_po7wN0jhXBqYvO",
            aPISecretKey: "DXWeBVME5z87xZ3DKvqC2nfp",
            callbackUrl: "https://api-dev-students.ncorepro.com/Payment/HandleRazorpayPaymentResponse",
            onBoardingPaymentCallbackUrl: "https://api-dev-bigleads.ncorepro.com/StudentOnboarding/HandleRazorpayPaymentResponse",
        }
    },

    primeUiLicense: 'eyJpZCI6IjMzYzI0ZTQ5LTg5MDgtNDExYy1hOWFjLTlhZTlhNzhiNjc3ZCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODc0MjEyNjQsImV4cCI6MTgxODk1NzI2NH0.wB4kHjI_9P3L23rU6DWXqD2xBJyThYSL41t69OPp23qGrvONcUN0FbRPKLu_5ylYix9XbEmEMyi-4hhV-OzEAQ'
} as const;
