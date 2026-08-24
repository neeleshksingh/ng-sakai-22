import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeSalaryBreakDown } from 'src/app/shared/models/smallbizgurus/employee-salary-breakdown';
import { SalaryStructureSalaryComponentMapping } from 'src/app/shared/models/smallbizgurus/salary-structure-salary-component-mapping';
import { GenericServiceNols } from 'src/app/shared/services/generic-service-nols.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SalaryStructureSalaryComponentMappingService extends GenericServiceNols<SalaryStructureSalaryComponentMapping, SalaryStructureSalaryComponentMapping> {

  constructor(http: HttpClient) {
    super(http, "SalaryStructureSalaryComponentMapping", environment.apiHumanResourcesUrl);
  }

  getBySalaryStructureId(salaryStructureId: number) {
    return this.http.get<SalaryStructureSalaryComponentMapping[]>(environment.apiHumanResourcesUrl +
      '/SalaryStructureSalaryComponentMapping/GetBySalaryStructureId/' + salaryStructureId);
  }

  getSalaryCalculationBySalaryStructureIdBySalaryStructureIdAndMonthlySalary(salaryStructureId: number, monthlySalary: number) {
    return this.http.get<EmployeeSalaryBreakDown>(environment.apiHumanResourcesUrl +
      '/SalaryStructureSalaryComponentMapping/GetSalaryCalculationBySalaryStructureIdBySalaryStructureId/' + salaryStructureId + '/MonthlySalary/' + monthlySalary);
  }
}