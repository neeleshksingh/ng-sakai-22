import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeAddress } from 'src/app/shared/models/smallbizgurus/employee-address';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class EmployeeDetailsService {

    constructor(private http: HttpClient) { }

    getAllEmployee(){
        return this.http.get<any>(environment.apiGlobalUrl + '/Employee/GetAll');
    }

    getEmployeeByEmail(email:string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/Employee/GetByEmail/' + email);
    }

    getEmployeeById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/Employee/GetByIntId/' + id)
    }

    getByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/Employee/GetByEmployeeCode/' + employeeCode)
    }
    getAddressByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeAddress/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeAddressAll(){
        return this.http.get<EmployeeAddress[]>(environment.apiGlobalUrl+ `/EmployeeAddress/GetAll`)
    }
    
    getEmployeeAddressById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeAddress/GetByIntId/' + id);
    }
    getContactByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeContact/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeContactById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeContact/GetByIntId/' + id);
    }
    getBankDetailsByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeBankDetail/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeBankDetailsById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeBankDetail/GetByIntId/' + id);
    }
    getEducationalHistoryByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeEducationalHistory/GetByEmployeeCode/' + employeeCode)
    }
    getEducationalHistoryList() {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeEducationalHistory/GetAll')
    }
    getEmployeeEducationalHistoryById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeEducationalHistory/GetByIntId/' + id);
    }
    getProfessionalHistoryByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeProfessionalHistory/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeProfessionalHistoryById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeProfessionalHistory/GetByIntId/' + id);
    }
    getProfessionalProjectByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeProfessionalProject/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeProfessionalProjectById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeProfessionalProject/GetByIntId/' + id);
    }
    getFamilyDetailsByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeFamily/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeFamilyDetailsById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeFamily/GetByIntId/' + id);
    }
    getEmployeeIdentityByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeIdentity/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeEmployeeIdentityById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeIdentity/GetByIntId/' + id);
    }
    getEmployeeJoinigDetailsByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeJoiningDetail/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeJoinigDetailsById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeJoiningDetail/GetByIntId/' + id);
    }
    getEmployeeLanguageByEmployeeCode(employeeCode: string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeLanguage/GetByEmployeeCode/' + employeeCode)
    }
    getEmployeeLanguageById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeLanguage/GetByIntId/' + id);
    }
    getEmployeeDocumentByEmployeeCode(employeeCode: string){
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeDocument/GetByEmployeeCode/' + employeeCode);
    }
    getEmployeeDocumentById(id: number) {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeDocument/GetByIntId/' + id);
    }
    getEmployeeByTerms(terms:string) {
        return this.http.get<any>(environment.apiGlobalUrl + '/Employee/GetByTerms/' + terms);
    }
    getEmployeeDepartmentGroup() {
        return this.http.get<any>(environment.apiGlobalUrl + '/EmployeeDepartmentGroup/GetAll');
    }
}