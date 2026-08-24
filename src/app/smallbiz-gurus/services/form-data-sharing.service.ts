import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root',
})
export class FormDataService {
    formData: any = {};
    private jobApplicationId: number = 0;
    private phoneNumber: string = '';
    private resumeLink: string = '';
    private disabledSubmit: boolean = false;
    private disableTab: boolean = false;
    private employeeId: number = 0;
    private dateRange: any;

    setDateRange(dateRange: any) {
        this.dateRange = dateRange;
    }

    getDateRange() {
        return this.dateRange;
    }

    setFormData(key: string, data: any) {
        this.formData[key] = data;
    }

    getFormData(key: string) {
        return this.formData[key];
    }

    setEmployeeId(id: number) {
        this.employeeId = id;
    }

    getEmployeeId() {
        return this.employeeId;
    }

    setJobApplicationId(id: number) {
        this.jobApplicationId = id;
    }

    getJobApplicationId() {
        return this.jobApplicationId;
    }

    setPhoneNumber(phoneNumber: string) {
        this.phoneNumber = phoneNumber;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }

    setResumeLink(resumeLink: string) {
        this.resumeLink = resumeLink;
    }

    getResumeLink() {
        return this.resumeLink;
    }

    setSubmitDisabled(disabledSubmit: boolean) {
        this.disabledSubmit = disabledSubmit;
    }

    getSubmitDisabled(): boolean {
        return this.disabledSubmit;
    }

    setTabDisabled(disableTab: boolean) {
        this.disableTab = disableTab;
    }

    getTabDisabled(): boolean {
        return this.disableTab;
    }

    resetFormData() {
        this.formData = {};
    }
}