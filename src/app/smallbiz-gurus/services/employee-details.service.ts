import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Employee } from 'src/app/shared/models/smallbizgurus/employee';
import { EmployeeAddress } from 'src/app/shared/models/smallbizgurus/employee-address';
import { EmployeeBankDetails } from 'src/app/shared/models/smallbizgurus/employee-bank-details';
import { EmployeeContact } from 'src/app/shared/models/smallbizgurus/employee-contact';
import { EmployeeDocument } from 'src/app/shared/models/smallbizgurus/employee-document';
import { EmployeeEducationalHistory } from 'src/app/shared/models/smallbizgurus/employee-educational-history';
import { EmployeeFamily } from 'src/app/shared/models/smallbizgurus/employee-family';
import { EmployeeIdentity } from 'src/app/shared/models/smallbizgurus/employee-identity';
import { EmployeeJoiningDetails } from 'src/app/shared/models/smallbizgurus/employee-joining-details';
import { EmployeeLanguage } from 'src/app/shared/models/smallbizgurus/employee-language';
import { EmployeeProfessionalHistory } from 'src/app/shared/models/smallbizgurus/employee-professional-history';
import { EmployeeProfessionalProject } from 'src/app/shared/models/smallbizgurus/employee-professional-project';
import { EmployeeUploadDocument } from 'src/app/shared/models/smallbizgurus/employee-upload-document';
import { EmployeeUploadPhoto } from 'src/app/shared/models/smallbizgurus/employee-upload-photo';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeeDetailsService {

    constructor(private http: HttpClient, private messageService: MessageService,) { }

    getAllEmployee() {
        return this.http.get<Employee[]>(environment.apiHumanResourcesUrl + '/Employee/GetAll');
    }

    addEmployeeDetails(employee: Employee): Promise<Employee> {
        return this.http.post<Employee>(environment.apiHumanResourcesUrl + '/Employee/Add', employee)
            .toPromise()
            .then(res => res as Employee)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    updateEmployeeDetails(employee: Employee) {
        return this.http.put<Employee>(environment.apiHumanResourcesUrl + '/Employee/UpdateById', employee);
    }

    addEmployeeAddress(employeeAddress: EmployeeAddress): Promise<EmployeeAddress> {
        return this.http.post<EmployeeAddress>(environment.apiHumanResourcesUrl + '/EmployeeAddress/Add', employeeAddress)
            .toPromise()
            .then(res => res as EmployeeAddress)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    addEmployeeContact(employeeContact: EmployeeContact): Promise<EmployeeContact> {
        return this.http.post<EmployeeContact>(environment.apiHumanResourcesUrl + '/EmployeeContact/Add', employeeContact)
            .toPromise()
            .then(res => res as EmployeeContact)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    addEmployeeEducationalHistory(employeeEducationalHistory: EmployeeEducationalHistory): Promise<EmployeeEducationalHistory> {
        return this.http.post<EmployeeEducationalHistory>(environment.apiHumanResourcesUrl + '/EmployeeEducationalHistory/Add', employeeEducationalHistory)
            .toPromise()
            .then(res => res as EmployeeEducationalHistory)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    addEmployeeFamily(employeeFamily: EmployeeFamily): Promise<EmployeeFamily> {
        return this.http.post<EmployeeFamily>(environment.apiHumanResourcesUrl + '/EmployeeFamily/Add', employeeFamily)
            .toPromise()
            .then(res => res as EmployeeFamily)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    addEmployeeIdentity(employeeIdentity: EmployeeIdentity): Promise<EmployeeIdentity> {
        return this.http.post<EmployeeIdentity>(environment.apiHumanResourcesUrl + '/EmployeeIdentity/Add', employeeIdentity)
            .toPromise()
            .then(res => res as EmployeeIdentity)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    addEmployeeJoiningDetails(employeeJoiningDetails: EmployeeJoiningDetails): Promise<EmployeeJoiningDetails> {
        return this.http.post<EmployeeJoiningDetails>(environment.apiHumanResourcesUrl + '/EmployeeJoiningDetail/Add', employeeJoiningDetails)
            .toPromise()
            .then(res => res as EmployeeJoiningDetails)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    addEmployeeLanguage(employeeLanguage: EmployeeLanguage): Promise<EmployeeLanguage> {
        return this.http.post<EmployeeLanguage>(environment.apiHumanResourcesUrl + '/EmployeeLanguage/Add', employeeLanguage)
            .toPromise()
            .then(res => res as EmployeeLanguage)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    addEmployeeBankDetails(employeeBankDetails: EmployeeBankDetails): Promise<EmployeeBankDetails> {
        return this.http.post<EmployeeBankDetails>(environment.apiHumanResourcesUrl + '/EmployeeBankDetail/Add', employeeBankDetails)
            .toPromise()
            .then(res => res as EmployeeBankDetails)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    addEmployeeProfessionalHistory(employeeProfessionalHistory: EmployeeProfessionalHistory): Promise<EmployeeProfessionalHistory> {
        return this.http.post<EmployeeProfessionalHistory>(environment.apiHumanResourcesUrl + '/EmployeeProfessionalHistory/Add', employeeProfessionalHistory)
            .toPromise()
            .then(res => res as EmployeeProfessionalHistory)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    addEmployeeProfessionalProject(employeeProfessionalProject: EmployeeProfessionalProject): Promise<EmployeeProfessionalProject> {
        return this.http.post<EmployeeProfessionalProject>(environment.apiHumanResourcesUrl + '/EmployeeProfessionalProject/Add', employeeProfessionalProject)
            .toPromise()
            .then(res => res as EmployeeProfessionalProject)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    addEmployeeDocument(employeeDocument: EmployeeDocument): Promise<EmployeeDocument> {
        return this.http.post<EmployeeDocument>(environment.apiHumanResourcesUrl + '/EmployeeDocument/Add', employeeDocument)
            .toPromise()
            .then(res => res as EmployeeDocument)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    uploadEmployeeDocumentById(documentUpload: EmployeeUploadDocument, formData: any) {
        return this.http.post<EmployeeUploadDocument>(environment.apiHumanResourcesUrl + '/EmployeeDocument/UploadDocument/' + documentUpload.employeeDocumentId, formData)
            .toPromise()
            .then(res => res as EmployeeUploadDocument)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    uploadEmployeePhotoUrlByEmployeeCode(employeeUploadPhoto: EmployeeUploadPhoto, formData: any) {
        return this.http.post<EmployeeUploadPhoto>(environment.apiHumanResourcesUrl + '/Employee/UpdateEmployeePhotoUrlByEmployeeCode/' + employeeUploadPhoto.employeeCode, formData)
            .toPromise()
            .then(res => res as EmployeeUploadPhoto)
            .catch(err => {
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err, life: 3000 });
                throw new Error(err);
            });
    }

    // getEmployeeByEmail(email:string) {
    //     return this.http.get<any>(environment.apiHumanResourcesUrl + '/Employee/GetByEmail/' + email);
    // }

    getEmployeeById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/Employee/GetByIntId/' + id)
    }

    getByEmployeeCode(employeeCode: string) {
        return this.http.get<Employee>(environment.apiHumanResourcesUrl + '/Employee/GetByEmployeeCode/' + employeeCode)
    }
    getAddressByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeAddress/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeAddressAll() {
        return this.http.get<EmployeeAddress[]>(environment.apiHumanResourcesUrl + `/EmployeeAddress/GetAll`)
    }

    deleteEmployeeAddress(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeAddress/DeleteByIntId/${id}`, null)
    }
    getEmployeeAddressById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeAddress/GetByIntId/' + id);
    }
    getContactByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeContact/GetByEmployeeCode/' + employeeCode)
    }
    deleteEmployeeContact(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeContact/DeleteByIntId/${id}`, id)
    }
    getEmployeeContactById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeContact/GetByIntId/' + id);
    }
    getBankDetailsByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeBankDetail/GetByEmployeeCode/' + employeeCode)
    }
    deleteEmployeeBankDetails(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeBankDetail/DeleteByIntId/${id}`, null)
    }
    getEmployeeBankDetailsById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeBankDetail/GetByIntId/' + id);
    }
    getEducationalHistoryByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeEducationalHistory/GetByEmployeeCode/' + employeeCode)
    }
    getEducationalHistoryList() {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeEducationalHistory/GetAll')
    }
    getEmployeeEducationalHistoryById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeEducationalHistory/GetByIntId/' + id);
    }
    deleteEmployeeEducationalHistory(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeEducationalHistory/DeleteByIntId/${id}`, null)
    }
    getProfessionalHistoryByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeProfessionalHistory/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeProfessionalHistoryById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeProfessionalHistory/GetByIntId/' + id);
    }
    deleteEmployeeProfessionalHistory(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeProfessionalHistory/DeleteByIntId/${id}`, null)
    }
    getProfessionalProjectByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeProfessionalProject/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeProfessionalProjectById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeProfessionalProject/GetByIntId/' + id);
    }
    deleteEmployeeProfessionalProject(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeProfessionalProject/DeleteByIntId/${id}`, null)
    }
    getFamilyDetailsByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeFamily/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeFamilyDetailsById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeFamily/GetByIntId/' + id);
    }
    deleteEmployeeFamilyDetails(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeFamily/DeleteByIntId/${id}`, null)
    }
    getEmployeeIdentityByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeIdentity/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeEmployeeIdentityById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeIdentity/GetByIntId/' + id);
    }
    deleteEmployeeEmployeeIdentity(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeIdentity/DeleteByIntId/${id}`, null)
    }
    getEmployeeJoinigDetailsByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeJoiningDetail/GetByEmployeeCode/' + employeeCode)
    }

    getEmployeeJoiningDetails() {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeJoiningDetail/GetAll')
    }

    getEmployeeJoinigDetailsById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeJoiningDetail/GetByIntId/' + id);
    }
    deleteEmployeeJoinigDetails(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeJoiningDetail/DeleteByIntId/${id}`, null)
    }
    getEmployeeLanguageByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeLanguage/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeLanguageById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeLanguage/GetByIntId/' + id);
    }
    deleteEmployeeLanguage(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeLanguage/DeleteByIntId/${id}`, null)
    }
    getEmployeeDocumentByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeDocument/GetByEmployeeCode/' + employeeCode);
    }
    getEmployeeDocumentById(id: number) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeDocument/GetByIntId/' + id);
    }

    deleteEmployeeDocument(id: number) {
        return this.http.post<any>(environment.apiHumanResourcesUrl + `/EmployeeDocument/DeleteByIntId/${id}`, null)
    }

    getEmployeeByTerms(terms: string) {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/Employee/GetByTerms/' + terms);
    }
    getEmployeeDepartmentGroup() {
        return this.http.get<any>(environment.apiHumanResourcesUrl + '/EmployeeDepartmentGroup/GetAll');
    }
}