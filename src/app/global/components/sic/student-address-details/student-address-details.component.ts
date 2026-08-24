import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { StudentAddressService } from 'src/app/big-leads/services/student-address.service';
import { SharedModule } from '@/shared.module';
import { StudentAddress } from 'src/app/shared/models/bigleads/student-address';

@Component({
  selector: 'app-student-address-details',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-address-details.component.html',
  styleUrls: ['./student-address-details.component.scss']
})
export class StudentAddressDetailsComponent implements OnInit {
  studentAddress: StudentAddress[] = [];
  tableArrayAddressDetails: any[] = [];
  tableArrayAddressDetailsList: any[] = [];
  @Input() studentId: string = '';
  private previousStudentId: string = '';

  constructor(
    private studentAddressService: StudentAddressService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      debounceTime(300),
      distinctUntilChanged((prev, curr) => prev.get('studentId') === curr.get('studentId'))
    ).subscribe(params => {
      const newStudentId = params.get('studentId') || '';
      if (newStudentId && newStudentId !== this.previousStudentId) {
        this.clearSessionStorage();
        this.studentId = newStudentId;
        this.previousStudentId = newStudentId;
        const cachedAddress = this.getCachedAddress(newStudentId);
        if (cachedAddress) {
          this.studentAddress = cachedAddress;
          if (this.studentAddress?.length > 0) {
            this.tableArrayAddressDetailsList = [];
            this.addressDetailsTableFormate();
          } else {
            this.tableArrayAddressDetailsList = [];
          }
        } else {
          this.getStudentAddressByStudentId(newStudentId);
        }
      }
    });
  }

  private getCachedAddress(studentId: string): StudentAddress[] | null {
    const cachedData = sessionStorage.getItem(`studentAddress_${studentId}`);
    if (cachedData) {
      try {
        return JSON.parse(cachedData) as StudentAddress[];
      } catch (e) {
        console.error('Error parsing cached address data:', e);
        return null;
      }
    }
    return null;
  }

  private saveCachedAddress(studentId: string, address: StudentAddress[]) {
    try {
      sessionStorage.setItem(`studentAddress_${studentId}`, JSON.stringify(address));
    } catch (e) {
      console.error('Error saving address to sessionStorage:', e);
    }
  }

  private clearSessionStorage() {
    if (this.previousStudentId) {
      sessionStorage.removeItem(`studentAddress_${this.previousStudentId}`);
    }
  }

  getStudentAddressByStudentId(studentId: string) {
    this.studentAddressService.getStudentAddressByStudentId(studentId).subscribe(response => {
      this.studentAddress = response;
      this.saveCachedAddress(studentId, this.studentAddress);
      if (this.studentAddress?.length > 0) {
        this.tableArrayAddressDetailsList = [];
        this.addressDetailsTableFormate();
      } else {
        this.tableArrayAddressDetailsList = [];
      }
    });
  }

  refresh(): void {
    if (this.studentId) {
      this.clearSessionStorage();
      this.getStudentAddressByStudentId(this.studentId);
    }
  }

  addressDetailsTableFormate(): void {
    this.studentAddress.forEach(data => {
      this.tableArrayAddressDetails = [];
      this.tableArrayAddressDetails.push(
        {
          col1: 'AddressType:', col2: data.addressType,
          col3: 'Address:', col4: data.address1,
          col5: 'Address2:', col6: data.address2,
          col7: 'City:', col8: data.city
        },
        {
          col1: 'State:', col2: data.state,
          col3: 'Country:', col4: data.country,
          col5: 'PostalCode:', col6: data.postalCode,
          col7: '', col8: ''
        }
      );
      this.tableArrayAddressDetailsList.push(this.tableArrayAddressDetails);
    });
  }
}