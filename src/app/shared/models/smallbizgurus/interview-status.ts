import { BaseModel } from "../commons/base-model";

export class InterviewStatus extends BaseModel {

  interviewScheduleId?: number;
  result?: string;
  overallComments?: string;
  interviewRatings?: [
    {
      createdBy?: string;
      modifiedBy?: string;
      createdDate?: Date;
      modifiedDate?: Date;
      id?: number;
      interviewStatusId?: number;
      skills?: string;
      expectedRating?: number;
      actualRating?: number;
      comments?: string;
      status?: string
    }
  ]
}