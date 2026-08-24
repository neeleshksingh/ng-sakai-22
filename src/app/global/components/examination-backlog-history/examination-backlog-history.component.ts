import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BacklogHistory } from 'src/app/shared/models/knowledge-stand/backlog-history';
import { ExaminationResultService } from '../../services/knowledge-stands/examination-result.service';

@Component({
  selector: 'app-examination-backlog-history',
  standalone: false,
  templateUrl: './examination-backlog-history.component.html',
  styleUrl: './examination-backlog-history.component.scss'
})
export class ExaminationBacklogHistoryComponent  implements OnInit, OnDestroy {

  backlogHistoryList!: BacklogHistory[];
  studentBacklogSubscription! : Subscription;
  
  constructor(private knowledgeStandService: ExaminationResultService) { }
  ngOnDestroy(): void {
    this.studentBacklogSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.studentBacklogSubscription = this.knowledgeStandService.getStudentBacklog().subscribe(response => {
      this.backlogHistoryList = response;
    });
  }
}