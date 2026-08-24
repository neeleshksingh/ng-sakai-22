import { Component, OnInit } from '@angular/core';
import { StudentAddressService } from 'src/app/big-leads/services/student-address.service';
import { StudentAddress } from 'src/app/shared/models/bigleads/student-address';

@Component({
  selector: 'app-student-address-details',
  standalone: false,
  templateUrl: './student-address-details.component.html',
  styleUrl: './student-address-details.component.scss'
})
export class StudentAddressDetailsComponent  implements OnInit {
  studentAddress!: StudentAddress[];
  tableArrayAddressDetails: any[] = [];
  tableArrayAddressDetailsList: any[] = [];

  constructor(private studentAddressService: StudentAddressService) { }

  ngOnInit(): void {
    this.studentAddressService.studentAddress.subscribe(response => {
      this.studentAddress = response;
      if (this.studentAddress?.length > 0) {
        this.tableArrayAddressDetailsList = [];
        this.addressDetailsTableFormate();
      }
    });
  }
  addressDetailsTableFormate(){
    this.studentAddress.forEach(data => {
    this.tableArrayAddressDetails = [];
        this.tableArrayAddressDetails.push(
          { col1: 'AddressType:', col2: data.addressType, col3: 'Address:', col4: data.address1 },
          { col1: 'Address2:', col2: data.address2, col3: 'City:', col4: data.city },
          { col1: 'State:', col2: data.state, col3: 'Country:', col4: data.country },
          { col1: 'PostalCode:', col2: data.postalCode },
        );
        this.tableArrayAddressDetailsList.push(this.tableArrayAddressDetails);
      });
  }
}
