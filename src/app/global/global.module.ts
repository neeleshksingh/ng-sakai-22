import { NgModule } from '@angular/core';
import { SharedModule } from '@/shared.module';
import { AcademicSessionProgramOperationalVerticalSearchComponent } from './components/search-components/academic-session-program-operational-vertical-search/academic-session-program-operational-vertical-search.component';
import { AcademicSessionProgramOVMultiSearchComponent } from './components/search-components/academic-session-program-ovmulti-search/academic-session-program-ovmulti-search.component';
import { AcademicSessionProgramOVSearchComponent } from './components/search-components/academic-session-program-ovsearch/academic-session-program-ovsearch.component';
import { BatchAttendanceComponent } from './components/sic-old-version/batch-attendance/batch-attendance.component';
import { DocumentCenterGlobalComponent } from './components/document-center-global/document-center-global.component';
import { EmployeeSalaryBreakDownComponent } from './components/employee-salary-break-down/employee-salary-break-down.component';
import { ExaminationAcademicSessionProgramOperationalVerticalMultiSearchComponent } from './components/search-components/examination-academic-session-program-operational-vertical-multi-search/examination-academic-session-program-operational-vertical-multi-search.component';
import { ExaminationAcademicSessionProgramOvSearchComponent } from './components/search-components/examination-academic-session-program-ov-search/examination-academic-session-program-ov-search.component';
import { ExaminationBacklogHistoryComponent } from './components/examination-backlog-history/examination-backlog-history.component';
import { ExaminationResultComponent } from './components/sic-old-version/examination-result/examination-result.component';
import { GenericManageComponent } from './components/generic-components/generic-manage/generic-manage.component';
import { GenericTableComponent } from './components/generic-components/generic-table/generic-table.component';
import { GenericViewComponent } from './components/generic-components/generic-view/generic-view.component';
import { NotFoundComponent } from './components/exception-pages/not-found/not-found.component';
import { ProgressBarComponent } from './components/progress-bar/progress-bar.component';
import { BarGraphSkeletonComponent } from './components/skeletons/bar-graph-skeleton/bar-graph-skeleton.component';
import { DashboardCardsSkeletonComponent } from './components/skeletons/dashboard-cards-skeleton/dashboard-cards-skeleton.component';
import { DashboardListSkeletonComponent } from './components/skeletons/dashboard-list-skeleton/dashboard-list-skeleton.component';
import { StudentAddressDetailsComponent } from './components/sic-old-version/student-address-details/student-address-details.component';
import { StudentBasicInformationComponent } from './components/sic-old-version/student-basic-information/student-basic-information.component';
import { StudentBusHostelOptInOptOutComponent } from './components/sic-old-version/student-bus-hostel-opt-in-opt-out/student-bus-hostel-opt-in-opt-out.component';
import { StudentFamilyDetailsComponent } from './components/sic-old-version/student-family-details/student-family-details.component';
import { StudentGeneralDetailsComponent } from './components/sic-old-version/student-general-details/student-general-details.component';
import { StudentInformationCentreTabsComponent } from './components/sic-old-version/student-information-centre-tabs/student-information-centre-tabs.component';
import { StudentInformationCentreComponent } from './components/sic-old-version/student-information-centre/student-information-centre.component';
import { StudentProgramComponent } from './components/sic-old-version/student-program/student-program.component';
import { StudentSearchComponent } from './components/search-components/student-search/student-search.component';
import { StudentTopperListComponent } from './components/student-topper-list/student-topper-list.component';

@NgModule({
    imports: [
        SharedModule,
        GenericViewComponent,
        GenericTableComponent,
        AcademicSessionProgramOperationalVerticalSearchComponent,
        ExaminationAcademicSessionProgramOperationalVerticalMultiSearchComponent,
        BarGraphSkeletonComponent,
        DashboardCardsSkeletonComponent,
        AcademicSessionProgramOVMultiSearchComponent,

        AcademicSessionProgramOVSearchComponent,
        DashboardListSkeletonComponent,
        ExaminationAcademicSessionProgramOvSearchComponent,
        GenericManageComponent,
        StudentTopperListComponent,
        DocumentCenterGlobalComponent,
        NotFoundComponent,
        ProgressBarComponent,
        EmployeeSalaryBreakDownComponent,
    ],
    declarations: [
        ExaminationBacklogHistoryComponent,
        ExaminationResultComponent,
        BatchAttendanceComponent,
        StudentAddressDetailsComponent,
        StudentFamilyDetailsComponent,
        StudentBasicInformationComponent,
        StudentGeneralDetailsComponent,
        StudentInformationCentreTabsComponent,
        StudentProgramComponent,
        StudentSearchComponent,
        StudentInformationCentreComponent,
        StudentBusHostelOptInOptOutComponent,
    ],
    exports: [
        SharedModule,
        GenericViewComponent,
        GenericTableComponent,
        AcademicSessionProgramOperationalVerticalSearchComponent,
        ExaminationAcademicSessionProgramOperationalVerticalMultiSearchComponent,
        BarGraphSkeletonComponent,
        DashboardCardsSkeletonComponent,

        AcademicSessionProgramOVMultiSearchComponent,
        AcademicSessionProgramOVSearchComponent,
        DashboardListSkeletonComponent,
        ExaminationAcademicSessionProgramOvSearchComponent,
        GenericManageComponent,
        StudentTopperListComponent,
        DocumentCenterGlobalComponent,

        ExaminationBacklogHistoryComponent,
        ExaminationResultComponent,
        BatchAttendanceComponent,
        StudentAddressDetailsComponent,
        StudentFamilyDetailsComponent,
        StudentBasicInformationComponent,
        StudentGeneralDetailsComponent,
        StudentInformationCentreTabsComponent,
        StudentProgramComponent,
        StudentSearchComponent,
        StudentInformationCentreComponent,
        NotFoundComponent,
        ProgressBarComponent,
        EmployeeSalaryBreakDownComponent,
        StudentBusHostelOptInOptOutComponent,
    ]
})
export class GlobalModule { }
