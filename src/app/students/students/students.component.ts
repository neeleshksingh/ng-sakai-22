import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'primeng/api';
import { SharedModule } from '@/shared.module';
import partnerBasicInfo from '../../../../src/assets/jsonFiles/partnerBasicInfo.json';

@Component({
    selector: 'app-students',
    standalone: true,
    imports: [SharedModule],
    templateUrl: './students.component.html',
    styles: [
        `
            .active-link {
                background-color: #e0e6ff;
                color: white;
                border-radius: 6px;
            }

            .layout-menu li {
                transition: background-color 0.3s ease;
            }
        `,
    ],
})
export class StudentsComponent implements OnInit {
    items!: any[];
    errorMessage!: Message[];
    partnerCode!: string;
    id!: number;
    gg: any;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {
        let url = window.location.href;
        const rem = partnerBasicInfo.partners;

        for (let ee in rem) {
            if (rem[ee].shortName !== '') {
                const ros = url.includes(rem[ee].shortName);
                if (ros) {
                    const res = ee;
                    this.partnerCode = rem[ee].partnerCode;
                    break;
                }
            }
        }

        this.id = this.gg || 1;
        var componentsRoles = this.router.config
            .filter((x) => x.path == 'home')[0]
            .children?.filter((x) => x.path == 'students')[0].data?.[
            'userRoles'
        ];

        let isAllowed = false;
        const currentUserJsonString = localStorage.getItem('currentUser') ?? '';

        if (currentUserJsonString) {
            const loginResponse = JSON.parse(currentUserJsonString);
            var applicationUserRoles = loginResponse.applicationUser.roles;
            for (const role of componentsRoles) {
                for (const allowedRole of applicationUserRoles) {
                    if (role.toLowerCase() === allowedRole.toLowerCase()) {
                        isAllowed = true;
                        break;
                    }
                }
            }

            if (!isAllowed) {
                this.router.navigateByUrl('/home/students/forbidden-access');
            }
        }

        this.items = [
            {
                label: 'Dashboard',
                icon: 'pi pi-fw pi-home',
                routerLink: ['/home/students/dashboard'],
            },
            {
                label: 'Accounts',
                icon: 'pi pi-fw pi-credit-card',
                items: [
                    {
                        label: 'Payment',
                        icon: 'pi pi-fw pi-pencil',
                        routerLink: ['/home/students/payments'],
                    },
                    {
                        label: 'Challan',
                        icon: 'pi pi-fw pi pi-fw pi-globe',
                        routerLink: ['/home/students/challan'],
                    },
                    {
                        label: 'Receipt',
                        icon: 'pi pi-fw pi-calendar-plus',
                        routerLink: ['/home/students/reciept'],
                    },
                    {
                        label: 'Receipt - V2',
                        icon: 'pi pi-fw pi-calendar-plus',
                        routerLink: ['/home/students/reciept/v2'],
                        disabled: true,
                    },
                ],
            },
            {
                label: 'Academics',
                icon: 'pi pi-fw pi-book',
                badgeStyleClass: 'text-badge',
                items: [
                    {
                        label: 'Semester Registration',
                        icon: 'pi pi-fw pi-id-card',
                        routerLink: ['/home/students/semester-registration'],
                    },
                    {
                        label: 'Attendance',
                        icon: 'pi pi-fw pi-check-square',
                        routerLink: ['/home/students/batch-attendence-summary'],
                    },
                    {
                        label: 'Curriculum Framework',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/home/students/curriculum-framework'],
                    },
                    {
                        label: 'Time Table',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['/home/students/time-table'],
                    },
                ],
            },
            {
                label: 'Examinations',
                icon: 'pi pi-fw pi-compass',
                items: [
                    // {
                    //   label: 'Registration', icon: 'pi pi-fw pi-desktop',
                    //   items: [
                    //     { label: 'Regular Examination', icon: 'pi pi-fw pi-desktop', routerLink: ['/home/students/examination-registration'] },
                    //   ]
                    // },
                    {
                        label: 'Backlog/ Supplementary Examination',
                        icon: 'pi pi-fw pi-desktop',
                        items: [
                            {
                                label: 'Backlog/ Supplementary Examination Application',
                                icon: 'pi pi-fw pi-desktop',
                                routerLink: [
                                    '/home/students/backlog-examination-application',
                                ],
                            },
                            // { label: 'Backlog/ Supplementary Examination Registration', icon: 'pi pi-fw pi-desktop', routerLink: ['/home/students/backlog-examination-registration'] },
                        ],
                    },
                    {
                        label: 'Result',
                        icon: 'pi pi-fw pi-bookmark',
                        routerLink: ['/home/students/academic-result'],
                    },
                    {
                        label: 'Examination Hall Ticket',
                        icon: 'pi pi-download',
                        routerLink: ['/home/students/admit-card'],
                        disabled: false,
                    },
                    // { label: 'Admit Card V2', icon: 'pi pi-download', routerLink: ['/home/students/admit-card/v2'] },
                    {
                        label: 'Scrutiny Application',
                        icon: 'pi pi-external-link',
                        routerLink: ['/home/students/scrutiny-application'],
                    },
                ],
            },
            {
                label: 'Services',
                icon: 'pi pi-fw pi-server',
                items: [
                    {
                        label: 'Search Book',
                        icon: 'pi pi-file-pdf',
                        routerLink: ['/home/students/search-book'],
                    },
                    {
                        label: 'Verify ABC ID (NEW)',
                        icon: 'pi pi-verified',
                        routerLink: ['/home/students/verify-apaar'],
                    },

                    {
                        label: 'Helpshift',
                        icon: 'pi pi-fw pi-align-left',
                        items: [
                            {
                                label: 'Payment Help',
                                icon: 'pi pi-fw pi-palette',
                                routerLink: ['/home/students/payment-help'],
                            },
                            //{ label: 'ProfileUpdateRequest', icon: 'pi pi-fw pi-pencil' },
                            {
                                label: 'Request Tracker',
                                icon: 'pi pi-fw pi-pencil',
                                routerLink: ['/home/students/request-tracker'],
                            },
                            {
                                label: 'Info Update Request',
                                icon: 'pi pi-fw pi-ticket',
                                routerLink: [
                                    '/home/students/student-info-update-request',
                                ],
                            },
                            {
                                label: 'Service Request',
                                icon: 'pi pi-fw pi-palette',
                                routerLink: [
                                    '/home/students/service-request-list',
                                ],
                                disabled: true,
                            },
                        ],
                    },
                    {
                        label: 'Certificate',
                        icon: 'pi pi-fw pi-ticket',
                        items: [
                            {
                                label: 'Bonafide (Job)',
                                icon: 'pi pi-fw pi-ticket',
                                routerLink: ['/home/students/bonafied-job'],
                            },
                            {
                                label: 'Bonafide (Fees)',
                                icon: 'pi pi-fw pi-ticket',
                                routerLink: ['/home/students/bonafied-fees'],
                            },
                            {
                                label: 'Bonafide (E-Kalyan)',
                                icon: 'pi pi-fw pi-ticket',
                                routerLink: [
                                    '/home/students/bonafied-e-kaliyan-scholarship',
                                ],
                            },
                            {
                                label: 'No Dues Certificate',
                                icon: 'pi pi-fw pi-ticket',
                                routerLink: [
                                    '/home/students/no-dues-certificate',
                                ],
                            },
                            {
                                label: 'CGPA to % Conversion Certificate',
                                icon: 'pi pi-fw pi-ticket',
                                routerLink: [
                                    '/home/students/cgpa-conversion-certificate',
                                ],
                            },
                        ],
                    },
                    {
                        label: 'Document Centre',
                        icon: 'pi pi-file-pdf',
                        routerLink: ['/home/students/document-center'],
                    },
                    {
                        label: 'Grievance Redressal Committee',
                        icon: 'pi pi-fw pi-ticket',
                        url: 'https://sbu.ac.in/greivanceredressal.aspx',
                        target: '_blank',
                    },
                    {
                        label: 'Caste Based Discrimination',
                        icon: 'pi pi-fw pi-ticket',
                        url: 'https://sbu.ac.in/caste-based-discrimination.aspx',
                        target: '_blank',
                    },
                    {
                        label: 'E-Learning',
                        icon: 'pi pi-fw pi-times-circle',
                        routerLink: ['/home/students/e-learning'],
                    },
                    {
                        label: 'Feedback',
                        icon: 'pi pi-fw pi-comment',
                        items: [
                            {
                                label: 'Faculty Feedback',
                                icon: 'pi pi-fw pi-info-circle',
                                routerLink: ['/home/students/student-feedback'],
                            },
                            {
                                label: 'Student Satisfaction Survey',
                                icon: 'pi pi-fw pi-info-circle',
                                routerLink: [
                                    '/home/students/student-satisfaction-survey',
                                ],
                            },
                        ],
                    },
                    { label: 'Program Change Request', icon: 'pi pi-fw pi-ticket', routerLink: ['/home/students/student-program-change-request'] },
                ],
            },

            {
                label: 'Settings',
                icon: 'pi pi-fw pi-cog',
                items: [
                    {
                        label: 'Profile',
                        icon: 'pi pi-fw pi-user',
                        items: [
                            {
                                label: 'View',
                                icon: 'pi pi-fw pi-palette',
                                routerLink: ['/home/students/student-profile'],
                            },
                            {
                                label: 'Update',
                                icon: 'pi pi-fw pi-palette',
                                routerLink: [
                                    '/home/students/student-profile-update',
                                ],
                            },
                        ],
                    },
                    {
                        label: 'Change Password',
                        icon: 'pi pi-fw pi-palette',
                        routerLink: ['/home/students/change-password'],
                    },
                ],
            },
        ];
    }
}
