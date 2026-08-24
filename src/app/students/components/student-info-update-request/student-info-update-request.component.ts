import { DatePipe } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService, SelectItem } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { SharedModule } from '@/shared.module';
import { Student } from 'src/app/shared/models/students/student';
import { StudentAddress } from 'src/app/shared/models/students/student-address';
import { StudentFamily } from 'src/app/shared/models/students/student-family';
import {
  DataListToBeUpdated, StudentDocument, UpdateInformationRequest,
  UpdateInformationResponce as UpdateInformationResponse
} from 'src/app/shared/models/students/student-profile-update-request';
import { CommonService } from '../../services/common.service';
import { StudentAddressService } from '../../services/student-address.service';
import { StudentFamilyService } from '../../services/student-family.service';
import { StudentProfileUpdateRequestService } from '../../services/student-profile-update-request.service';
import { StudentService } from '../../services/student.service';
// import { CasteList } from 'src/app/Students/Models/Common/CasteList';
// import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
// import { CommonConnectionOptions } from 'tls';

@Component({
  selector: 'app-student-info-update-request',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './student-info-update-request.component.html',
  styleUrl: './student-info-update-request.component.scss'
})
export class StudentInfoUpdateRequestComponent {
  @ViewChild('fileUpload1') fileUpload1!: FileUpload;

  componentName: string = "Information Update Request";
  studentDetailsUpdateRequestGroup!: FormGroup;
  student: Student = {};
  studentFamilies: StudentFamily[] = [];
  studentAddresses: StudentAddress[] = [];
  numberPattern = "^[0-9]*$";
  emailPattern = "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$";
  isFileError: boolean = false;
  fileError: string = "";
  updateInformationRequest: UpdateInformationRequest = {};
  dataListToBeUpdated: DataListToBeUpdated[] = [];
  studentDocument: StudentDocument = {};
  formData = new FormData();
  displayFileNameFor: string = "";
  isStudentNameFileUploadDisabled = true;
  isStudentDOBFileUploadDisabled = true;
  isStudentGenderFileUploadDisabled = true;
  isStudentCasteFileUploadDisabled = true;
  isStudentCategoryFileUploadDisabled = true;
  isStudentReligionFileUploadDisabled = true;
  isStudentAadharFileUploadDisabled = true;
  isStudentVoterFileUploadDisabled = true;
  isStudentPANFileUploadDisabled = true;
  isStudentphysicallyHandicapedFileUploadDisabled = true;
  isStudentMinorityFileUploadDisabled = true;
  isStudentFathersFileUploadDisabled = true;
  isStudentMothersFileUploadDisabled = true;
  isStudentPermanentFileUploadDisabled = true;
  isStudentLocalFileUploadDisabled = true;
  isStudentSSCFileUploadDisabled = true;
  isStudentDiplomaFileUploadDisabled = true;
  isStudentHSCFileUploadDisabled = true;
  isStudentUGFileUploadDisabled = true;
  isStudentPGFileUploadDisabled = true;

  genderList: SelectItem[] = [];
  stateList: SelectItem[] = [];
  countryList: SelectItem[] = [];
  yesNoList: SelectItem[] = [];
  casteList: SelectItem[] = [];
  categoryList: SelectItem[] = [];
  religionList: SelectItem[] = [];
  studentNameUpdateDocumentList: SelectItem[] = [];
  studentDOBUpdateDocumentList: SelectItem[] = [];
  studentGenderUpdateDocumentList: SelectItem[] = [];
  studentCasteUpdateDocumentList: SelectItem[] = [];
  aadharUpdateDocumentList: SelectItem[] = [];
  studentVoterUpdateDocumentList: SelectItem[] = [];
  studentPANUpdateDocumentList: SelectItem[] = [];
  studentPhysicallyHandicapedUpdateDocumentList: SelectItem[] = [];
  studentMinorityUpdateDocumentList: SelectItem[] = [];
  studentAddressUpdateDocumentList: SelectItem[] = [];
  studentEducationUpdateDocumentList: SelectItem[] = [];
  updateInformationResponse: UpdateInformationResponse[] = [];
  updateInformationResponseList: UpdateInformationResponse[] = [];
  propertyId: string = "";
  comments: string = "";
  isPropertyDisabled: boolean = false;

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private messageService: MessageService,
    private studentFamilyService: StudentFamilyService,
    private studentAddressService: StudentAddressService,
    private datePipe: DatePipe,
    private commonService: CommonService,
    private studentProfileUpdateRequestService: StudentProfileUpdateRequestService) { }

  ngOnInit(): void {
    this.updateInformationResponseList = [];
    this.getGenderList();
    this.getYesNoList();
    this.getCountryList();
    this.getStateList();
    this.getAllCasteList();
    this.getAllReligionList();
    this.getAllCasteCategoryList();
    this.initializeStudentDetailsUpdateGroup();
    this.getStudentNameUpdateDocumentList();
    this.getStudentDOBUpdateDocumentList();
    this.getStudentGenderUpdateDocumentList();
    this.getStudentCasteUpdateDocumentList();
    this.getAadharUpdateDocumentList();
    this.getStudentVoterUpdateDocumentList();
    this.getStudentPANUpdateDocumentList();
    this.getStudentPhysicallyHandicapedUpdateDocumentList();
    this.getStudentMinorityUpdateDocumentList();
    this.getStudentAddressUpdateDocumentList();
    this.getStudentEducationUpdateDocumentList();
    this.GetGeneralDetails();
  }
  getStudentInformationUpdateRequestByStudentId() {
    if (this.student.studentId) {
      this.studentProfileUpdateRequestService.GetStudentInformationUpdateRequestByStudentId(this.student.studentId).subscribe(data => {
        if (data) {
          this.updateInformationResponseList = [];
          this.updateInformationResponseList = data;
        }
      })
    }
  }
  initializeStudentDetailsUpdateGroup() {
    this.studentDetailsUpdateRequestGroup = this.fb.group({
      requestId: [''],
      studentId: 0,
      fileName: [{ value: null, disabled: true }],
      firstName: ['', [Validators.required]],
      middleName: [''],
      lastName: [''],
      nameComment: ['', [Validators.required]],
      isNameDocumentAttached: false,
      nameDocumentType: [''],
      nameDocumentUrl: [''],
      nameDocumentValue: [''],
      nameStatus: [''],

      dob: [''],
      dobComment: [''],
      isDobDocumentAttached: false,
      dobDocumentType: [''],
      dobDocumentUrl: [''],
      nameDOBValue: [''],
      dobStatus: [''],

      gender: ['', [Validators.required]],
      genderComment: [''],
      isGenderDocumentAttached: false,
      genderDocumentType: [''],
      genderDocumentUrl: [''],
      genderStatus: [''],

      aadharNumber: ['', [Validators.maxLength(12), Validators.pattern(this.numberPattern)]],
      aadharComment: [''],
      isAadharDocumentAttached: false,
      aadharDocumentType: [''],
      aadharDocumentUrl: [''],
      aadharStatus: [''],

      voterId: ['', [Validators.maxLength(10)]],
      voterComment: [''],
      isVoterDocumentAttached: false,
      voterDocumentType: [''],
      voterDocumentUrl: [''],
      voterStatus: [''],

      pan: ['', [Validators.maxLength(10)]],
      panComment: [''],
      isPanDocumentAttached: false,
      panDocumentType: [''],
      panDocumentUrl: [''],
      panStatus: [''],

      isPhysicallyHandicaped: false,
      physicallyHandicapedComment: [''],
      isPhysicallyHandicapedDocumentAttached: false,
      physicallyHandicapedDocumentType: [''],
      physicallyHandicapedDocumentUrl: [''],
      physicallyHandicapedStatus: [''],

      casteId: 0,
      casteComment: [''],
      isCasteDocumentAttached: false,
      casteDocumentType: [''],
      casteDocumentUrl: [''],
      casteStatus: [''],

      casteCategoryId: 0,
      categoryComment: [''],
      isCategoryDocumentAttached: false,
      categoryDocumentType: [''],
      categoryDocumentUrl: [''],
      categoryStatus: [''],

      religionId: 0,
      religionComment: [''],
      isReligionDocumentAttached: false,
      religionDocumentType: [''],
      religionDocumentUrl: [''],
      religionStatus: [''],

      isMinority: false,
      minorityComment: [''],
      isMinorityDocumentAttached: false,
      minorityDocumentType: [''],
      minorityDocumentUrl: [''],
      minorityStatus: [''],

      familyRelationName: [''],
      fathersFirstName: [''],
      fathersMiddleName: [''],
      fathersLastName: [''],
      fathersMobileNumber: ['', [Validators.maxLength(10), Validators.pattern(this.numberPattern), Validators.required],],
      fathersEmailId: ['', Validators.pattern(this.emailPattern)],
      fathersNameComment: [''],
      isFathersNameDocumentAttached: false,
      fathersNameDocumentType: [''],
      fathersNameDocumentUrl: [''],
      fathersNameStatus: [''],

      mothersFirstName: [''],
      mothersMiddleName: [''],
      mothersLastName: [''],
      mothersMobileNumber: ['', [Validators.maxLength(10), Validators.pattern(this.numberPattern), Validators.required]],
      mothersEmailId: ['', Validators.pattern(this.emailPattern)],
      mothersNameComment: [''],
      ismothersNameDocumentAttached: false,
      mothersNameDocumentType: [''],
      mothersDocumentUrl: [''],
      mothersStatus: [''],

      addressType: [''],
      permanentAddress1: [''],
      permanentAddress2: [''],
      permanentCity: [''],
      permanentState: [''],
      permanentCountry: [''],
      permanentPostalCode: ['', [Validators.maxLength(6), Validators.pattern(this.numberPattern)]],
      permanentComment: [''],
      ispermanentDocumentAttached: false,
      permanentDocumentType: [''],
      permanentDocumentUrl: [''],
      permanentStatus: [''],
      localAddress1: [''],
      localAddress2: [''],
      localCity: [''],
      localState: [''],
      localCountry: [''],
      localPostalCode: ['', [Validators.maxLength(6), Validators.pattern(this.numberPattern)]],
      localComment: [''],
      islocalDocumentAttached: false,
      localDocumentType: [''],
      localDocumentUrl: [''],
      localStatus: [''],

      sscDegreeName: [''],
      sscInstitutionName: [''],
      sscBoardUniversity: [''],
      sscPassingYear: ['', [Validators.maxLength(4), Validators.pattern(this.numberPattern)]],
      sscSubject: [''],
      sscTotalMarks: ['', [Validators.pattern(this.numberPattern)]],
      sscObtainedMarks: ['', [Validators.pattern(this.numberPattern)]],
      sscGrade: [''],
      sscComment: [''],
      isSscDocumentAttached: false,
      sscDocumentType: [''],
      sscDocumentUrl: [''],
      sscStatus: [''],

      diplomaDegreeName: [''],
      diplomaInstitutionName: [''],
      diplomaBoardUniversity: [''],
      diplomaPassingYear: ['', [Validators.maxLength(6), Validators.pattern(this.numberPattern)]],
      diplomaSubject: [''],
      diplomaTotalMarks: ['', [Validators.pattern(this.numberPattern)]],
      diplomaObtainedMarks: ['', [Validators.pattern(this.numberPattern)]],
      diplomaGrade: [''],
      diplomaComment: [''],
      isdiplomaDocumentAttached: false,
      diplomaDocumentType: [''],
      diplomaDocumentUrl: [''],
      diplomaStatus: [''],


      hscDegreeName: [''],
      hscInstitutionName: [''],
      hscBoardUniversity: [''],
      hscPassingYear: ['', [Validators.maxLength(6), Validators.pattern(this.numberPattern)]],
      hscSubject: [''],
      hscTotalMarks: ['', [Validators.pattern(this.numberPattern)]],
      hscObtainedMarks: ['', [Validators.pattern(this.numberPattern)]],
      hscGrade: [''],
      hscComment: [''],
      ishscDocumentAttached: false,
      hscDocumentType: [''],
      hscDocumentUrl: [''],
      hscStatus: [''],

      ugDegreeName: [''],
      ugInstitutionName: [''],
      ugBoardUniversity: [''],
      ugPassingYear: ['', [Validators.maxLength(6), Validators.pattern(this.numberPattern)]],
      ugSubject: [''],
      ugTotalMarks: ['', [Validators.pattern(this.numberPattern)]],
      ugObtainedMarks: ['', [Validators.pattern(this.numberPattern)]],
      ugGrade: [''],
      ugComment: [''],
      isugDocumentAttached: false,
      ugDocumentType: [''],
      ugDocumentUrl: [''],
      ugStatus: [''],

      pgDegreeName: [''],
      pgInstitutionName: [''],
      pgBoardUniversity: [''],
      pgPassingYear: ['', [Validators.maxLength(6), Validators.pattern(this.numberPattern)]],
      pgSubject: [''],
      pgTotalMarks: ['', [Validators.pattern(this.numberPattern)]],
      pgObtainedMarks: ['', [Validators.pattern(this.numberPattern)]],
      pgGrade: [''],
      pgComment: [''],
      ispgDocumentAttached: false,
      pgDocumentType: [''],
      pgDocumentUrl: [''],
      pgStatus: [''],
    });
  }
  disableProperty(property: any): boolean {
    var idddddd = property.id;
    if (this.updateInformationResponseList.length > 0) {
      if (property.id) {
        this.propertyId = property.id;
      }
      if (property.el && property.el.nativeElement.id) {
        this.propertyId = property.el.nativeElement.id;
      }
      var filterResult = this.updateInformationResponseList.filter((x: any) => x.propertyName == this.propertyId && x.status.toUpperCase() == "NEW");
      if (filterResult.length > 0) {
        this.isPropertyDisabled = true;
        return this.isPropertyDisabled;
      }
    }
    return false;
  }
  GetGeneralDetails() {
    this.student = {};
    this.studentService.GetStudentProfile().subscribe(data => {
      this.student = data;
      if (data) {
        this.student.dob = this.datePipe.transform(this.student.dob, 'dd-MMM-yyyy') ?? "";
        this.student.gender = this.student.gender?.toUpperCase();
        this.studentDetailsUpdateRequestGroup.patchValue(this.student);
        this.GetStudentFamily();
        this.GetStudentAddress();
        this.getStudentInformationUpdateRequestByStudentId();
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
    });
  }
  GetStudentFamily() {
    this.studentFamilies = [];
    this.studentFamilyService.GetStudentFamily().subscribe(data => {
      this.studentFamilies = data;
      if (data) {
        this.familyDetailsDataManipulation(data);
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
    });
  }
  GetStudentAddress() {
    this.studentAddresses = [];
    this.studentAddressService.GetStudentAddress().subscribe(data => {
      this.studentAddresses = data;
      if (data) {
        this.addressDataManipulation(data);
      }
    }, err => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message, life: 3000 });
    });
  }
  familyDetailsDataManipulation(data: any[]) {
    if (data.filter(x => x.familyRelationName.toUpperCase() == 'MOTHER')) {
      var result = data.filter(x => x.familyRelationName.toUpperCase() == 'MOTHER');
      this.studentDetailsUpdateRequestGroup.patchValue({ mothersFirstName: result[0].firstName });
      this.studentDetailsUpdateRequestGroup.patchValue({ mothersMiddleName: result[0].middleName });
      this.studentDetailsUpdateRequestGroup.patchValue({ mothersLastName: result[0].lastName });
    }
    if (data.filter(x => x.familyRelationName.toUpperCase() == 'FATHER')) {
      var result = data.filter(x => x.familyRelationName.toUpperCase() == 'FATHER');
      this.studentDetailsUpdateRequestGroup.patchValue({ fathersFirstName: result[0].firstName });
      this.studentDetailsUpdateRequestGroup.patchValue({ fathersMiddleName: result[0].middleName });
      this.studentDetailsUpdateRequestGroup.patchValue({ fathersLastName: result[0].lastName });
    }
  }
  addressDataManipulation(data: any[]) {
    if (data.filter((x: any) => x.addressType.toUpperCase() == 'PERMANENT')) {
      var result = data.filter((x: any) => x.addressType.toUpperCase() == 'PERMANENT');
      if (result.length > 0) {
        this.studentDetailsUpdateRequestGroup.patchValue({ permanentAddress1: result[0].address1 });
        this.studentDetailsUpdateRequestGroup.patchValue({ permanentAddress2: result[0].address2 });
        this.studentDetailsUpdateRequestGroup.patchValue({ permanentCity: result[0].city });
        this.studentDetailsUpdateRequestGroup.patchValue({ permanentState: result[0].state });
        this.studentDetailsUpdateRequestGroup.patchValue({ permanentCountry: result[0].country });
        this.studentDetailsUpdateRequestGroup.patchValue({ permanentPostalCode: result[0].postalCode });
      }
    }
    if (data.filter((x: any) => x.addressType.toUpperCase() == 'LOCAL')) {
      var result = data.filter((x: any) => x.addressType.toUpperCase() == 'LOCAL');
      if (result.length > 0) {
        this.studentDetailsUpdateRequestGroup.patchValue({ localAddress1: result[0].address1 });
        this.studentDetailsUpdateRequestGroup.patchValue({ localAddress2: result[0].address2 });
        this.studentDetailsUpdateRequestGroup.patchValue({ localCity: result[0].city });
        this.studentDetailsUpdateRequestGroup.patchValue({ localState: result[0].state });
        this.studentDetailsUpdateRequestGroup.patchValue({ localCountry: result[0].country });
        this.studentDetailsUpdateRequestGroup.patchValue({ localPostalCode: result[0].postalCode });
      }
    }
  }
  onDataChange(value: any, documentType: any, existingValue: any) {

    if (value.id && value.value && value.value != existingValue) {
      if (value.id == 'firstName' || value.id == 'middleName' || value.id == 'lastName') {
        if (this.dataListToBeUpdated.filter(x => x.propertyName == 'firstName' || x.propertyName == 'middleName'
          || x.propertyName == 'lastName').length == 0) {
          this.dataListToBeUpdated = [];
        }
      }
      if (value.id == 'fathersFirstName' || value.id == 'fathersMiddleName' || value.id == 'fathersLastName'
        || value.id == 'fathersMobileNumber' || value.id == 'fathersEmailId') {
        if (this.dataListToBeUpdated.filter(x => x.propertyName == 'fathersFirstName' || x.propertyName == 'fathersMiddleName'
          || x.propertyName == 'fathersLastName' || x.propertyName == 'fathersMobileNumber' || x.propertyName == 'fathersEmailId').length == 0) {
          this.dataListToBeUpdated = [];
        }
      }
      if (value.id == 'mothersFirstName' || value.id == 'mothersMiddleName' || value.id == 'mothersLastName'
        || value.id == 'mothersMobileNumber' || value.id == 'mothersEmailId') {
        if (this.dataListToBeUpdated.filter(x => x.propertyName == 'mothersFirstName' || x.propertyName == 'mothersMiddleName' || x.propertyName == 'mothersLastName' || x.propertyName == 'mothersMobileNumber' || x.propertyName == 'mothersEmailId').length == 0) {
          this.dataListToBeUpdated = [];
        }
      }
      if (value.id == 'permanentAddress1' || value.id == 'permanentAddress2' || value.id == 'permanentCity' || value.id == 'permanentPostalCode'
        || value.id == 'permanentState' || value.id == 'permanentCountry') {
        if (this.dataListToBeUpdated.filter(x => x.propertyName == 'permanentAddress1' || x.propertyName == 'permanentAddress2'
          || x.propertyName == 'permanentCity' || x.propertyName == 'permanentPostalCode' || x.propertyName == 'permanentState'
          || x.propertyName == 'permanentCountry').length == 0) {
          this.dataListToBeUpdated = [];
        }
      }
      if (value.id == 'localAddress1' || value.id == 'localAddress2' || value.id == 'localCity' || value.id == 'localPostalCode'
        || value.id == 'localState' || value.id == 'localCountry') {
        if (this.dataListToBeUpdated.filter(x => x.propertyName == 'localAddress1' || x.propertyName == 'localAddress2'
          || x.propertyName == 'localCity' || x.propertyName == 'localPostalCode' || x.propertyName == 'localState'
          || x.propertyName == 'localCountry').length == 0) {
          this.dataListToBeUpdated = [];
        }
      }
      const sscFields = [
        'sscDegreeName',
        'sscInstitutionName',
        'sscBoardUniversity',
        'sscPassingYear',
        'sscSubject',
        'sscTotalMarks',
        'sscObtainedMarks',
        'sscGrade',
      ];

      if (value.id && sscFields.includes(value.id)) {
        const hasMatchingFields = this.dataListToBeUpdated.some(
          (x) => x.propertyName && sscFields.includes(x.propertyName)
        );

        if (!hasMatchingFields) {
          this.dataListToBeUpdated = [];
        }
      }
      if (value.id == 'diplomaDegreeName' || value.id == 'diplomaInstitutionName' || value.id == 'diplomaBoardUniversity' || value.id == 'diplomaPassingYear'
        || value.id == 'diplomaSubject' || value.id == 'diplomaTotalMarks' || value.id == 'diplomaObtainedMarks' || value.id == 'diplomaGrade') {
        if (this.dataListToBeUpdated.filter(x => x.propertyName == 'diplomaDegreeName' || x.propertyName == 'diplomaInstitutionName'
          || x.propertyName == 'diplomaBoardUniversity' || x.propertyName == 'diplomaPassingYear' || x.propertyName == 'diplomaSubject'
          || x.propertyName == 'diplomaTotalMarks' || x.propertyName == 'diplomaObtainedMarks' || x.propertyName == 'diplomaGrade').length == 0) {
          this.dataListToBeUpdated = [];
        }
      }
      if (value.id == 'hscDegreeName' || value.id == 'hscInstitutionName' || value.id == 'hscBoardUniversity' || value.id == 'hscPassingYear'
        || value.id == 'hscSubject' || value.id == 'hscTotalMarks' || value.id == 'hscObtainedMarks' || value.id == 'hscGrade') {
        if (this.dataListToBeUpdated.filter(x => x.propertyName == 'hscDegreeName' || x.propertyName == 'hscInstitutionName'
          || x.propertyName == 'hscBoardUniversity' || x.propertyName == 'hscPassingYear' || x.propertyName == 'hscSubject'
          || x.propertyName == 'hscTotalMarks' || x.propertyName == 'hscObtainedMarks' || x.propertyName == 'hscGrade').length == 0) {
          this.dataListToBeUpdated = [];
        }
      }
      if (value.id == 'ugDegreeName' || value.id == 'ugInstitutionName' || value.id == 'ugBoardUniversity' || value.id == 'ugPassingYear'
        || value.id == 'ugSubject' || value.id == 'ugTotalMarks' || value.id == 'ugObtainedMarks' || value.id == 'ugGrade') {
        if (this.dataListToBeUpdated.filter(x => x.propertyName == 'ugDegreeName' || x.propertyName == 'ugInstitutionName'
          || x.propertyName == 'ugBoardUniversity' || x.propertyName == 'ugPassingYear' || x.propertyName == 'ugSubject'
          || x.propertyName == 'ugTotalMarks' || x.propertyName == 'ugObtainedMarks' || x.propertyName == 'ugGrade').length == 0) {
          this.dataListToBeUpdated = [];
        }
      }
      if (value.id == 'pgDegreeName' || value.id == 'pgInstitutionName' || value.id == 'pgBoardUniversity' || value.id == 'pgPassingYear'
        || value.id == 'pgSubject' || value.id == 'pgTotalMarks' || value.id == 'pgObtainedMarks' || value.id == 'pgGrade') {
        if (this.dataListToBeUpdated.filter(x => x.propertyName == 'pgDegreeName' || x.propertyName == 'pgInstitutionName'
          || x.propertyName == 'pgBoardUniversity' || x.propertyName == 'pgPassingYear' || x.propertyName == 'pgSubject'
          || x.propertyName == 'pgTotalMarks' || x.propertyName == 'pgObtainedMarks' || x.propertyName == 'pgGrade').length == 0) {
          this.dataListToBeUpdated = [];
        }
      }

      var updateItem = this.dataListToBeUpdated.find(x => x.propertyName == value.id);
      let index: any = -1;
      if (updateItem) {
        index = this.dataListToBeUpdated.indexOf(updateItem);
      }

      if (index == -1) {
        this.dataListToBeUpdated.push({ propertyName: value.id, propertyValue: value.value });
      }
      else {
        this.dataListToBeUpdated[index].propertyValue = value.value;
      }
    }
  }
  addComment(value: { value: string; }) {
    if (value.value) {
      this.comments = value.value;
    }
  }
  captureMultipalProperty(value1: any, value2: any, value3: any, value4: any, value5: any, value6: any, value7: any, value8: any) {
    this.dataListToBeUpdated = [];

    if (value1) { this.dataListToBeUpdatedInsert(value1) };
    if (value2) { this.dataListToBeUpdatedInsert(value2) };
    if (value3) { this.dataListToBeUpdatedInsert(value3) };
    if (value4) { this.dataListToBeUpdatedInsert(value4) };
    if (value5) { this.dataListToBeUpdatedInsert(value5) };
    if (value6) { this.dataListToBeUpdatedInsert(value6) };
    if (value7) { this.dataListToBeUpdatedInsert(value7) };
    if (value8) { this.dataListToBeUpdatedInsert(value8) };
  }
  dataListToBeUpdatedInsert(value: any) {

    if (value.id) {
      this.propertyId = value.id;
    }
    if (value.el && value.el.nativeElement.id) {
      this.propertyId = value.el.nativeElement.id;
    }
    var updateItem = this.dataListToBeUpdated.find(x => x.propertyName == this.propertyId);
    let index: any = -1;
    if (updateItem) {
      index = this.dataListToBeUpdated.indexOf(updateItem);
    }
    if (index == -1) {
      this.dataListToBeUpdated.push({ propertyName: this.propertyId, propertyValue: value.value });
    }
    else {
      this.dataListToBeUpdated[index].propertyValue = value.value;
    }
  }
  onDateChange(value: { el: { nativeElement: { id: string | undefined; }; }; }, documentType: any, existingValue: any, event: any) {
    if (value.el.nativeElement.id && event && event != existingValue) {
      this.dataListToBeUpdated = [];  //.push({propertyName: null, propertyValue: null});
      var updateItem = this.dataListToBeUpdated.find(x => x.propertyName == value.el.nativeElement.id);
      let index: any = -1;
      if (updateItem) {
        index = this.dataListToBeUpdated.indexOf(updateItem);
      }
      // documentType.disabled = false;
      if (index == -1) {
        this.dataListToBeUpdated.push({ propertyName: value.el.nativeElement.id, propertyValue: event });
      }
      else {
        this.dataListToBeUpdated[index].propertyValue = event;
      }
    }
  }
  onDropDownSelect(value: any, documentType: any, existingValue: any, event: { value: string | undefined; }) {
    if (value.el.nativeElement.id) {
      if (value.el.nativeElement.id == 'isMinority' || value.el.nativeElement.id == 'isPhysicallyHandicaped'
        || value.el.nativeElement.id == 'casteId' || value.el.nativeElement.id == 'casteCategoryId'
        || value.el.nativeElement.id == 'religionId') {
        event.value = String(event.value);
      }
      if (event.value && event.value != existingValue) {
        if (value.id == 'permanentAddress1' || value.id == 'permanentAddress2' || value.id == 'permanentCity' || value.id == 'permanentPostalCode' || value.id == 'permanentState' || value.id == 'permanentCountry') {
          if (this.dataListToBeUpdated.filter(x => x.propertyName == 'permanentAddress1' || x.propertyName == 'permanentAddress2' || x.propertyName == 'permanentCity' || x.propertyName == 'permanentPostalCode' || x.propertyName == 'permanentState' || x.propertyName == 'permanentCountry').length == 0) {
            this.dataListToBeUpdated = [];
          }
        }
        if (value.id == 'localAddress1' || value.id == 'localAddress2' || value.id == 'localCity' || value.id == 'localPostalCode' || value.id == 'localState' || value.id == 'localCountry') {
          if (this.dataListToBeUpdated.filter(x => x.propertyName == 'localAddress1' || x.propertyName == 'localAddress2' || x.propertyName == 'localCity' || x.propertyName == 'localPostalCode' || x.propertyName == 'localState' || x.propertyName == 'localCountry').length == 0) {
            this.dataListToBeUpdated = [];
          }
        }
        var updateItem = this.dataListToBeUpdated.find(x => x.propertyName == value.el.nativeElement.id);
        let index: any = -1;
        if (updateItem) {
          index = this.dataListToBeUpdated.indexOf(updateItem);
        }
        documentType.disabled = false;
        if (index == -1) {
          this.dataListToBeUpdated.push({ propertyName: value.el.nativeElement.id, propertyValue: event.value });
        }
        else {
          this.dataListToBeUpdated[index].propertyValue = event.value;
        }
      }
    }
  }
  onDocumentTypeChanged(event: any, submitButton: any) {
    this.studentDocument = { documentType: event.value, isDocumentUploaded: false };
    this.displayFileNameFor = submitButton.id;

    if (submitButton.id == 'nameSubmit') {
      this.isStudentNameFileUploadDisabled = false;
    }
    else if (submitButton.id == 'dobSubmit') {
      this.isStudentDOBFileUploadDisabled = false;
    }
    else if (submitButton.id == 'genderSubmit') {
      this.isStudentGenderFileUploadDisabled = false;
    }
    else if (submitButton.id == 'casteSubmit') {
      this.isStudentCasteFileUploadDisabled = false;
    }
    else if (submitButton.id == 'categorySubmit') {
      this.isStudentCategoryFileUploadDisabled = false;
    }
    else if (submitButton.id == 'religionSubmit') {
      this.isStudentReligionFileUploadDisabled = false;
    }
    else if (submitButton.id == 'aadharSubmit') {
      this.isStudentAadharFileUploadDisabled = false;
    }
    else if (submitButton.id == 'voterSubmit') {
      this.isStudentVoterFileUploadDisabled = false;
    }
    else if (submitButton.id == 'panSubmit') {
      this.isStudentPANFileUploadDisabled = false;
    }
    else if (submitButton.id == 'physicallyHandicapedSubmit') {
      this.isStudentphysicallyHandicapedFileUploadDisabled = false;
    }
    else if (submitButton.id == 'minoritySubmit') {
      this.isStudentMinorityFileUploadDisabled = false;
    }
    else if (submitButton.id == 'fathersSubmit') {
      this.isStudentFathersFileUploadDisabled = false;
    }
    else if (submitButton.id == 'mothersSubmit') {
      this.isStudentMothersFileUploadDisabled = false;
    }
    else if (submitButton.id == 'permanentSubmit') {
      this.isStudentPermanentFileUploadDisabled = false;
    }
    else if (submitButton.id == 'localSubmit') {
      this.isStudentLocalFileUploadDisabled = false;
    }
    else if (submitButton.id == 'sscSubmit') {
      this.isStudentSSCFileUploadDisabled = false;
    }
    else if (submitButton.id == 'diplomaSubmit') {
      this.isStudentDiplomaFileUploadDisabled = false;
    }
    else if (submitButton.id == 'hscSubmit') {
      this.isStudentHSCFileUploadDisabled = false;
    }
    else if (submitButton.id == 'ugSubmit') {
      this.isStudentUGFileUploadDisabled = false;
    }
    else if (submitButton.id == 'pgSubmit') {
      this.isStudentPGFileUploadDisabled = false;
    }
  }
  documentUpload(event: any, fileUpload: any, value: any, submitButton: any) {
    this.isFileError = false;
    this.fileError = '';
    const file = event.files[0];
    this.studentDetailsUpdateRequestGroup.value.fileName = file.name;

    if (file.type !== 'application/pdf' || file.size > 10000000) {
      this.isFileError = true;
      if (file.type !== 'application/pdf') {
        this.fileError = "Please upload .pdf file format."
      }
      if (file.size > 10000000) {
        this.fileError = "File size should not be more than 1 MB";
      }
    }
    else {
      this.formData = new FormData;
      this.formData.append('formFile', file);
      submitButton.disabled = false;
    }
    fileUpload.remove();
  }
  sameAsPermanentAddress(event: any) {
    if (event.checked) {

      this.studentDetailsUpdateRequestGroup.patchValue({ localAddress1: this.studentDetailsUpdateRequestGroup.value.permanentAddress1 });
      this.studentDetailsUpdateRequestGroup.patchValue({ localAddress2: this.studentDetailsUpdateRequestGroup.value.permanentAddress2 });
      this.studentDetailsUpdateRequestGroup.patchValue({ localCity: this.studentDetailsUpdateRequestGroup.value.permanentCity });
      this.studentDetailsUpdateRequestGroup.patchValue({ localState: this.studentDetailsUpdateRequestGroup.value.permanentState });
      this.studentDetailsUpdateRequestGroup.patchValue({ localCountry: this.studentDetailsUpdateRequestGroup.value.permanentCountry });
      this.studentDetailsUpdateRequestGroup.patchValue({ localPostalCode: this.studentDetailsUpdateRequestGroup.value.permanentPostalCode });
    }
  }
  submit(documentType: any, submitButton: any) {
    this.updateInformationRequest = {
      studentId: this.student.studentId,
      status: 'NEW',
      documentType: this.studentDocument.documentType,
      comments: this.comments,
      dataListToBeUpdated: this.dataListToBeUpdated,
    }
    if (this.updateInformationRequest.dataListToBeUpdated && this.updateInformationRequest.dataListToBeUpdated.length > 0 && this.updateInformationRequest.documentType) {
      this.studentProfileUpdateRequestService.updateInformationRequest(this.updateInformationRequest).subscribe(data => {
        this.updateInformationRequest.documentType = '';
        this.updateInformationRequest.comments = "";
        this.comments = "";
        this.updateInformationResponse = data;
        if (this.updateInformationResponse?.[0]?.documentType && this.updateInformationResponse?.[0]?.requestId) {
          this.studentProfileUpdateRequestService.uploadDocument(this.updateInformationResponse[0].requestId,
            this.updateInformationResponse[0].documentType, this.formData).subscribe(data => {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'your request has been submitted successfully.' });
              this.updateInformationResponse = data;
              this.dataListToBeUpdated = [];
              this.assignDefaultValue(documentType, submitButton);
            }, err => {
              this.messageService.add({ severity: 'error', summary: 'Error - Information update', detail: err.error.message, life: 3000 });
            });
        }
      }, err => {
        this.messageService.add({ severity: 'error', summary: 'Error - Document upload', detail: err.error.message, life: 3000 });
      });
    }
    else {
      this.messageService.add({ severity: 'error', summary: 'Re-enter data and re-select document type', life: 3000 });
    }
  }
  assignDefaultValue(documentType: any, submitButton: { id: string; }) {
    // documentType.disabled = true;
    // submitButton.disabled = true;
    this.updateInformationRequest = {};
    this.studentDetailsUpdateRequestGroup.value.fileName = null;
    if (submitButton.id == 'nameSubmit') {
      this.isStudentNameFileUploadDisabled = true;
    }
    else if (submitButton.id == 'dobSubmit') {
      this.isStudentDOBFileUploadDisabled = true;
    }
    else if (submitButton.id == 'genderSubmit') {
      this.isStudentGenderFileUploadDisabled = true;
    }
    else if (submitButton.id == 'casteSubmit') {
      this.isStudentCasteFileUploadDisabled = true;
    }
    else if (submitButton.id == 'categorySubmit') {
      this.isStudentCategoryFileUploadDisabled = true;
    }
    else if (submitButton.id == 'religionSubmit') {
      this.isStudentReligionFileUploadDisabled = true;
    }
    else if (submitButton.id == 'aadharSubmit') {
      this.isStudentAadharFileUploadDisabled = true;
    }
    else if (submitButton.id == 'voterSubmit') {
      this.isStudentVoterFileUploadDisabled = true;
    }
    else if (submitButton.id == 'panSubmit') {
      this.isStudentPANFileUploadDisabled = true;
    }
    else if (submitButton.id == 'physicallyHandicapedSubmit') {
      this.isStudentphysicallyHandicapedFileUploadDisabled = true;
    }
    else if (submitButton.id == 'minoritySubmit') {
      this.isStudentMinorityFileUploadDisabled = true;
    }
    else if (submitButton.id == 'fathersSubmit') {
      this.isStudentFathersFileUploadDisabled = true;
    }
    else if (submitButton.id == 'mothersSubmit') {
      this.isStudentMothersFileUploadDisabled = true;
    }
    else if (submitButton.id == 'permanentSubmit') {
      this.isStudentPermanentFileUploadDisabled = true;
    }
    else if (submitButton.id == 'localSubmit') {
      this.isStudentLocalFileUploadDisabled = true;
    }
    else if (submitButton.id == 'sscSubmit') {
      this.isStudentSSCFileUploadDisabled = true;
    }
    else if (submitButton.id == 'diplomaSubmit') {
      this.isStudentDiplomaFileUploadDisabled = true;
    }
    else if (submitButton.id == 'hscSubmit') {
      this.isStudentHSCFileUploadDisabled = true;
    }
    else if (submitButton.id == 'ugSubmit') {
      this.isStudentUGFileUploadDisabled = true;
    }
    else if (submitButton.id == 'pgSubmit') {
      this.isStudentPGFileUploadDisabled = true;
    }

  }

  getAllCasteList() {
    this.commonService.getAllCaste().subscribe(data => {
      if (data) {
        this.casteList = [];
        data.forEach(x => {
          this.casteList.push({
            label: x.name,
            value: x.id
          })
        });
        // this.casteList.push({
        //   label: 'Select',
        //   value: 0
        // });
      }
    });
  }
  getAllCasteCategoryList() {
    this.commonService.getAllCasteCategory().subscribe(data => {
      if (data) {
        this.categoryList = [];
        data.forEach(x => {
          this.categoryList.push({
            label: x.name,
            value: x.id
          })
        });
        // this.categoryList.push({
        //   label: 'Select',
        //   value: 0
        // });
      }
    });
  }
  getAllReligionList() {
    this.commonService.getAllReligion().subscribe(data => {
      if (data) {
        this.religionList = [];
        data.forEach(x => {
          this.religionList.push({
            label: x.name,
            value: x.id
          })
        });
        // this.religionList.push({
        //   label: 'Select',
        //   value: 0
        // });
      }
    });
  }
  getGenderList() {
    this.genderList = [
      { label: 'MALE', value: 'MALE' },
      { label: 'FEMALE', value: 'FEMALE' },
      { label: 'OTHER', value: 'OTHER' },
    ];
  }
  getYesNoList() {
    this.yesNoList = [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ];
  }
  getCountryList() {
    this.countryList = [
      { label: 'India', value: 'India' },
      { label: 'Nepal', value: 'Nepal' },
      //{ label: 'Select', value: '' },
    ];
  }
  getStateList() {
    this.stateList = [
      // { label: 'Select', value: '' },
      { label: 'ANDAMAN AND NICOBAR ISLANDS', value: 'ANDAMAN AND NICOBAR ISLANDS' },
      { label: 'ANDHRA PRADESH', value: 'ANDHRA PRADESH' },
      { label: 'ARUNACHAL PRADESH', value: 'ARUNACHAL PRADESH' },
      { label: 'ASSAM', value: 'ASSAM' },
      { label: 'BIHAR', value: 'BIHAR' },
      { label: 'CHANDIGARH', value: 'CHANDIGARH' },
      { label: 'CHHATTISGARH', value: 'CHHATTISGARH' },
      { label: 'DADRA AND NAGAR HAVELI', value: 'DADRA AND NAGAR HAVELI' },
      { label: 'GOA', value: 'GOA' },
      { label: 'GUJARAT', value: 'GUJARAT' },
      { label: 'HARYANA', value: 'HARYANA' },
      { label: 'DELHI', value: 'DELHI' },
      { label: 'HIMACHAL PRADESH', value: 'HIMACHAL PRADESH' },
      { label: 'JAMMU & KASHMIR', value: 'JAMMU & KASHMIR' },
      { label: 'JHARKHAND', value: 'JHARKHAND' },
      { label: 'KARNATAKA', value: 'KARNATAKA' },
      { label: 'KERALA', value: 'KERALA' },
      { label: 'LADAKH ', value: 'LADAKH ' },
      { label: 'LAKSHADWEEP', value: 'LAKSHADWEEP' },
      { label: 'MADHYA PRADESH', value: 'MADHYA PRADESH' },
      { label: 'MAHARASHTRA', value: 'MAHARASHTRA' },
      { label: 'MANIPUR', value: 'MANIPUR' },
      { label: 'MEGHALAYA', value: 'MEGHALAYA' },
      { label: 'MIZORAM', value: 'MIZORAM' },
      { label: 'NAGALAND', value: 'NAGALAND' },
      { label: 'ODISHA', value: 'ODISHA' },
      { label: 'PUDUCHERRY', value: 'PUDUCHERRY' },
      { label: 'PUNJAB', value: 'PUNJAB' },
      { label: 'RAJASTHAN', value: 'RAJASTHAN' },
      { label: 'SIKKIM', value: 'SIKKIM' },
      { label: 'TAMIL NADU', value: 'TAMIL NADU' },
      { label: 'TELANGANA', value: 'TELANGANA' },
      { label: 'TRIPURA', value: 'TRIPURA' },
      { label: 'UTTARAKHAND', value: 'UTTARAKHAND' },
      { label: 'UTTAR PRADESH', value: 'UTTAR PRADESH' },
      { label: 'WEST BENGAL', value: 'WEST BENGAL' },
    ];
  }
  getStudentNameUpdateDocumentList() {
    this.studentNameUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: '10th or SSC Admit Card', value: '10th or SSC Admit Card' },
      { label: '12th Admit Card', value: '12th Admit Card' },
      { label: '10th or SSC Passing Certificate', value: '10th or SSC Passing Certificate' },
      { label: '12th Passing Certificate', value: '12th Passing Certificate' }
    ];
  }
  getStudentDOBUpdateDocumentList() {
    this.studentDOBUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: 'Birth Certificate', value: 'Birth Certificate' },
      { label: '10th or SSC Admit Card', value: '10th or SSC Admit Card' },
      { label: '12th Admit Card', value: '12th Admit Card' },
      { label: '10th or SSC Passing Certificate', value: '10th or SSC Passing Certificate' },
      { label: '12th Passing Certificate', value: '12th Passing Certificate' }
    ];
  }
  getStudentGenderUpdateDocumentList() {
    this.studentGenderUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: 'Birth Certificate', value: 'Birth Certificate' },
      { label: 'Aadhar Card', value: 'Aadhar Card' }
    ];
  }
  getStudentCasteUpdateDocumentList() {
    this.studentCasteUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: 'Caste Certificate', value: 'Caste Certificate' }
    ];
  }
  getAadharUpdateDocumentList() {
    this.aadharUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: 'Aadhar Card', value: 'Aadhar Card' }
    ];
  }
  getStudentVoterUpdateDocumentList() {
    this.studentVoterUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: 'Voter Card', value: 'Voter Card' }
    ];
  }
  getStudentPANUpdateDocumentList() {
    this.studentPANUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: 'PAN Card', value: 'PAN Card' }
    ];
  }
  getStudentPhysicallyHandicapedUpdateDocumentList() {
    this.studentPhysicallyHandicapedUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: 'Physically Handicaped Certificate', value: 'Physically Handicaped Certificate' }
    ];
  }
  getStudentMinorityUpdateDocumentList() {
    this.studentMinorityUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: 'Minority Certificate', value: 'Minority Certificate' }
    ];
  }
  getStudentAddressUpdateDocumentList() {
    this.studentAddressUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: 'Aadhar Card', value: 'Aadhar Card' },
      { label: 'Electricity Bill', value: 'Electricity Bill' }
    ];
  }
  getStudentEducationUpdateDocumentList() {
    this.studentEducationUpdateDocumentList = [
      { label: 'Select Document', value: null },
      { label: 'Marksheet', value: 'Marksheet' }
    ];
  }
}
