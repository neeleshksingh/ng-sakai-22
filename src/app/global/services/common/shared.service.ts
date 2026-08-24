import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { LoginResponse } from 'src/app/shared/models/idp/login';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    private loadingState = new BehaviorSubject<boolean>(false);
    isLoading$ = this.loadingState.asObservable();
    currentUserSubject: any;

    constructor(private http: HttpClient) {}

    private handleApiCall<T>(
        apiCall$: Observable<T>,
        retryCount: number = 3,
    ): Observable<T> {
        return apiCall$.pipe(
            retry(retryCount),
            catchError((error) => {
                console.error('API call failed', error);
                return of(null as T);
            }),
        );
    }

    loadApiData(currentUserSubject: any): void {
        this.setLoadingState(true);
        this.currentUserSubject = currentUserSubject;
        const globalApiData$ = this.getGlobalApiData();
        const additionalApiCalls = [];

        const roles = this.currentUserSubject.value.applicationUser.roles;
        if (
            roles.some(
                (role: any) =>
                    role.trim().includes('Masters') ||
                    role.trim().includes('Administration') ||
                    role.trim().includes('SuperAdministration'),
            )
        ) {
            additionalApiCalls.push(this.getCloudBytesApiData());
        }
        if (
            roles.some(
                (role: any) =>
                    role.trim().includes('Academics') ||
                    role.trim().includes('Administration') ||
                    role.trim().includes('SuperAdministration'),
            )
        ) {
            additionalApiCalls.push(this.getMindSparkApiData());
        }
        if (
            roles.some(
                (role: any) =>
                    role.trim().includes('Examinations') ||
                    role.trim().includes('Administration') ||
                    role.trim().includes('SuperAdministration'),
            )
        ) {
            additionalApiCalls.push(this.getKnowledgeStandApiData());
        }

        forkJoin([globalApiData$, ...additionalApiCalls]).subscribe({
            next: ([globalData, ...additionalData]) => {
                let dataIndex = 0;
                if (
                    roles.some((role: any) => role.trim().includes('Masters'))
                ) {
                    dataIndex++;
                }
                if (
                    roles.some(
                        (role: any) =>
                            role.trim().includes('Academics') ||
                            role.trim().includes('Administration') ||
                            role.trim().includes('SuperAdministration'),
                    )
                ) {
                    dataIndex++;
                }
                if (
                    roles.some(
                        (role: any) =>
                            role.trim().includes('Examinations') ||
                            role.trim().includes('Administration') ||
                            role.trim().includes('SuperAdministration'),
                    )
                ) {
                }

                this.setLoadingState(false);
            },
            error: (error) => {
                console.error('Error loading data:', error);
                this.setLoadingState(false);
            },
        });
    }

    getGlobalApiData(): Observable<any> {
        const apiCalls = [
            this.handleApiCall(
                this.http.get(
                    environment.apiGlobalUrl + '/AcademicSession/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/Program/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiGlobalUrl + '/OperationalVertical/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiGlobalUrl + '/AcademicSessionProgram/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/DegreeType/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/Degree/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/Faculty/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiGlobalUrl + '/FacultyDepartment/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiGlobalUrl + '/ProgramSpecialization/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/Subject/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/PaperType/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/SubjectType/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiGlobalUrl + '/FeeComponent/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiGlobalUrl + '/ConcessionCategory/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiGlobalUrl + '/SubjectPaperCode/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/Religion/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/Caste/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/Department/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/Designation/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiGlobalUrl + '/IdentityType/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/Building/GetAll'),
            ),
            this.handleApiCall(
                this.http.get(environment.apiGlobalUrl + '/Room/GetAll'),
            ),
        ];

        return forkJoin(apiCalls).pipe(
            map((responses) => {
                const [
                    academicSessionApiResponse,
                    programApiResponse,
                    operationalVerticalApiResponse,
                    academicSessionProgramApiResponse,
                    degreeTypeApiResponse,
                    degreeApiResponse,
                    facultyApiResponse,
                    facultyDepartmentApiResponse,
                    programSpecializationApiResponse,
                    subjectApiResponse,
                    paperTypeApiResponse,
                    subjectTypeApiResponse,
                    feeComponentApiResponse,
                    concessionCategoryApiResponse,
                    subjectPaperCodeApiResponse,
                    religionApiResponse,
                    casteApiResponse,
                    departmentApiResponse,
                    designationApiResponse,
                    identityTypeApiResponse,
                    buildingsApiResponse,
                    roomApiResponse,
                ] = responses;
                return {
                    academicSessionApiResponse,
                    programApiResponse,
                    operationalVerticalApiResponse,
                    academicSessionProgramApiResponse,
                    degreeTypeApiResponse,
                    degreeApiResponse,
                    facultyApiResponse,
                    facultyDepartmentApiResponse,
                    programSpecializationApiResponse,
                    subjectApiResponse,
                    paperTypeApiResponse,
                    subjectTypeApiResponse,
                    feeComponentApiResponse,
                    concessionCategoryApiResponse,
                    subjectPaperCodeApiResponse,
                    religionApiResponse,
                    casteApiResponse,
                    departmentApiResponse,
                    designationApiResponse,
                    identityTypeApiResponse,
                    buildingsApiResponse,
                    roomApiResponse,
                };
            }),
            catchError((error) => {
                console.error('Some API calls failed:', error);
                return of({ error: 'Some API calls failed', responses: error });
            }),
        );
    }

    getBuildings(): Observable<any[]> {
        return this.http.get<any[]>(
            `${environment.apiGlobalUrl}/Building/GetAll`,
        );
    }

    getRoomsByBuildingId(buildingId: number): Observable<any[]> {
        return this.http.get<any[]>(
            `${environment.apiMastersUrl}/Room/GetByBuildingId/${buildingId}`,
        );
    }

    getCloudBytesApiData(): Observable<any> {
        const data = localStorage.getItem('currentUser');
        if (data) {
            this.currentUserSubject = new BehaviorSubject<LoginResponse>(
                JSON.parse(data),
            );
            const partnerCode =
                this.currentUserSubject.value.applicationUser.partnerCode;

            const apiCalls = [
                this.handleApiCall(
                    this.http.get(
                        `${environment.apiMastersUrl}/Partner/GetByPartnerCode/${partnerCode}`,
                    ),
                ),
                this.handleApiCall(
                    this.http.get(
                        environment.apiMastersUrl + '/PartnerImageType/GetAll',
                    ),
                ),
                this.handleApiCall(
                    this.http.get(
                        environment.apiMastersUrl + '/PartnerImage/GetAll',
                    ),
                ),
                this.handleApiCall(
                    this.http.get(
                        environment.apiMastersUrl +
                            '/ServiceRequestDepartment/GetAll',
                    ),
                ),
                this.handleApiCall(
                    this.http.get(
                        environment.apiMastersUrl +
                            '/ServiceRequestWorkgroup/GetAll',
                    ),
                ),
                this.handleApiCall(
                    this.http.get(
                        environment.apiMastersUrl +
                            '/ServiceRequestCategory/GetAll',
                    ),
                ),
                this.handleApiCall(
                    this.http.get(
                        environment.apiMastersUrl +
                            '/ServiceRequestSubCategory/GetAll',
                    ),
                ),
                this.handleApiCall(
                    this.http.get(
                        environment.apiMastersUrl +
                            '/ServiceRequestMapping/GetAll',
                    ),
                ),
                this.handleApiCall(
                    this.http.get(
                        environment.apiMastersUrl +
                            '/StudentStatusDescription/GetAll',
                    ),
                ),
                this.handleApiCall(
                    this.http.get(
                        environment.apiMastersUrl + '/AcademicHoliday/GetAll',
                    ),
                ),
            ];

            return forkJoin(apiCalls).pipe(
                map((responses) => {
                    const [
                        partnerResponse,
                        partnerImageTypeResponse,
                        partnerImageResponse,
                        serviceRequestDepartmentResponse,
                        serviceRequestWorkgroupResponse,
                        serviceRequestCategoryResponse,
                        serviceRequestSubCategoryResponse,
                        serviceRequestMappingResponse,
                        studentStatusDescriptionResponse,
                        academicHolidayResponse,
                    ] = responses;
                    return {
                        partnerResponse,
                        partnerImageTypeResponse,
                        partnerImageResponse,
                        serviceRequestDepartmentResponse,
                        serviceRequestWorkgroupResponse,
                        serviceRequestCategoryResponse,
                        serviceRequestSubCategoryResponse,
                        serviceRequestMappingResponse,
                        studentStatusDescriptionResponse,
                        academicHolidayResponse,
                    };
                }),
                catchError((error) => {
                    console.error('Some API calls failed:', error);
                    return of({
                        error: 'Some API calls failed',
                        responses: error,
                    });
                }),
            );
        } else {
            return of(null);
        }
    }

    getExecutiveEdgeApiData(): Observable<any> {
        const apiCalls = [
            this.handleApiCall(
                this.http.get(
                    environment.apiExecutiveEdgeUrl +
                        '/FeedbackQuestion/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiExecutiveEdgeUrl + '/Notice/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiExecutiveEdgeUrl + '/StudentNotice/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiExecutiveEdgeUrl + '/DocumentCenter/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiExecutiveEdgeUrl +
                        '/FeedbackAnnouncement/GetAll',
                ),
            ),
        ];

        return forkJoin(apiCalls).pipe(
            map((responses) => {
                const [
                    feedbackQuestionApiResponse,
                    noticeApiResponse,
                    studentNoticeApiResponse,
                    documentCenterApiResponse,
                    feedbackAnnouncementApiResponse,
                ] = responses;
                return {
                    feedbackQuestionApiResponse,
                    noticeApiResponse,
                    studentNoticeApiResponse,
                    documentCenterApiResponse,
                    feedbackAnnouncementApiResponse,
                };
            }),
            catchError((error) => {
                console.error('Some API calls failed:', error);
                return of({ error: 'Some API calls failed', responses: error });
            }),
        );
    }

    getMindSparkApiData(): Observable<any> {
        const apiCalls = [
            this.handleApiCall(
                this.http.get(
                    environment.apiAcademicsUrl + '/BatchScheduleMaster/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiAcademicsUrl +
                        '/FacultySubjectAllocation/GetAll',
                ),
            ),
        ];

        return forkJoin(apiCalls).pipe(
            map((responses) => {
                const [
                    batchScheduleMasterApiResponse,
                    facultySubjectAllocationApiResponse,
                ] = responses;
                return {
                    batchScheduleMasterApiResponse,
                    facultySubjectAllocationApiResponse,
                };
            }),
            catchError((error) => {
                console.error('Some API calls failed:', error);
                return of({ error: 'Some API calls failed', responses: error });
            }),
        );
    }

    getKnowledgeStandApiData(): Observable<any> {
        const apiCalls = [
            this.handleApiCall(
                this.http.get(
                    environment.apiExaminationsUrl + '/Examination/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiExaminationsUrl + '/ExaminationType/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiExaminationsUrl + '/AssessmentType/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiExaminationsUrl +
                        '/AssessmentComponent/GetAll',
                ),
            ),
            this.handleApiCall(
                this.http.get(
                    environment.apiExaminationsUrl +
                        '/Examination/GetActiveExaminations',
                ),
            ),
        ];

        return forkJoin(apiCalls).pipe(
            map((responses) => {
                const [
                    examinationApiResponse,
                    examinationTypeApiResponse,
                    assessmentTypeApiResponse,
                    assessmentComponentApiResponse,
                    activeExaminationApiResponse,
                ] = responses;
                return {
                    examinationApiResponse,
                    examinationTypeApiResponse,
                    assessmentTypeApiResponse,
                    assessmentComponentApiResponse,
                    activeExaminationApiResponse,
                };
            }),
            catchError((error) => {
                console.error('Some API calls failed:', error);
                return of({ error: 'Some API calls failed', responses: error });
            }),
        );
    }

    setLoadingState(isLoading: boolean) {
        this.loadingState.next(isLoading);
    }
}
