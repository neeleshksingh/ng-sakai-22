export const environment = {
    production: true, xAPIKey: "cd3509e4-9848-4f70-9047-ce26bdd367ag",

    identityServerUrl: "https://api-sbu-idp.ncorepro.com",
    apiMastersUrl: "https://api-sbu-cloudbytes.ncorepro.com",
    apiAcademicsUrl: "https://api-sbu-mindspark.ncorepro.com",
    apiExaminationsUrl: "https://api-sbu-knowledgestand.ncorepro.com",
    apiAccountsUrl: "https://api-sbu-finpro.ncorepro.com",
    apiLeadsUrl: "https://api-sbu-bigleads.ncorepro.com",
    apiStudentsUrl: "https://api-sbu-students.ncorepro.com",
    apiHumanResourcesUrl: "https://api-sbu-smallbizgurus.ncorepro.com",
    apiTimeClockPlusUrl: "https://api-sbu-timeclockplus.ncorepro.com",
    apiDigitalFingersUrl: "https://api-sbu-digitalfingers.ncorepro.com",
    apiExecutiveEdgeUrl: "https://api-sbu-executiveedge.ncorepro.com",
    apiSignalRUrl: "https://api-sbu-signalr.ncorepro.com",
    apiFilemanagerUrl: "https://api-sbu-filemanager.ncorepro.com",
    apiVirtualLearnUrl: "https://api-sbu-virtuallearn.ncorepro.com",
    apiGlobalUrl: "https://api-sbu-global.ncorepro.com",

    partner: {
        id: 3,
        name: "Sarala Birla University",
        shortName: "SBU",
        title: "Sarala Birla University",
        city: "Ranchi",
        address: "Birla Knowledge City, PO - Mahilong, Purulia Rd, Ranchi, Jharkhand, 835103",
        description: "Sarala Birla University",
        partnerCode: "P10002",
        logo_url: "https://api-sbu-fileserver.ncorepro.com/Production/P10002/Resources/Images/Websites/LoginPagePartnerImage/EOuocPi75Grkcinc94VXd9xyzCISzg80uWWY7bplus3771uUequals.png",
        sloganText: "Transforming Global Leaders for Social and Economic Change",
        supportEmailId: "itsupport@sbu.ac.in",
        alertMessage: "",
        razorPay: {
            apiKey: "rzp_live_po7wN0jhXBqYvO",
            aPISecretKey: "DXWeBVME5z87xZ3DKvqC2nfp",
            callbackUrl: "https://api-sbu-students.ncorepro.com/Payment/HandleRazorpayPaymentResponse",
            onBoardingPaymentCallbackUrl: "https://api-sbu-bigleads.ncorepro.com/StudentOnboarding/HandleRazorpayPaymentResponse",
        }
    },
    primeUiLicense: 'eyJpZCI6IjMzYzI0ZTQ5LTg5MDgtNDExYy1hOWFjLTlhZTlhNzhiNjc3ZCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODc0MjEyNjQsImV4cCI6MTgxODk1NzI2NH0.wB4kHjI_9P3L23rU6DWXqD2xBJyThYSL41t69OPp23qGrvONcUN0FbRPKLu_5ylYix9XbEmEMyi-4hhV-OzEAQ'
} as const;
