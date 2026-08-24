import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-student-information-centre-tabs',
  standalone: false,
  templateUrl: './student-information-centre-tabs.component.html',
  styleUrl: './student-information-centre-tabs.component.scss'
})
export class StudentInformationCentreTabsComponent implements OnInit {
  studentId!: string;
  activeIndexValue!: number;
  @Output() activeIndex: EventEmitter<number> = new EventEmitter<number>();
  @Input() currentModuleNameToTab!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.activeIndexValue = Number(params.get('activeTab'));
    });
    this.route.paramMap.subscribe(params => {
      this.studentId = params.get('studentId')?? '';
    });
    this.activeIndex.emit(this.activeIndexValue);
  }
  handleChange(event: any) {
    this.activeIndexValue = typeof event === 'object' && event !== null && 'index' in event ? event.index : Number(event);
    this.activeIndex.emit(this.activeIndexValue);
    // this.router.navigateByUrl("/Home/Developers/Masters/Company/Test/" + this.studentId + "/" + this.activeIndexValue);

    this.router.navigateByUrl("/home/" + this.currentModuleNameToTab +"/reports/students/student-information/" + this.studentId + "/" + this.activeIndexValue);
    }
}
