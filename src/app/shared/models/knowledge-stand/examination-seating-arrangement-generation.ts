import { BaseModel } from "../commons/base-model";

export class ExaminationSeatingArrangementGeneration extends BaseModel {
      examinationId?:number;
      academicSessionId?:number;
      programId?:number;
      operationalVerticalId?:number;
      subjectId?:number;
      subjectPaperCodeId?: number;
      registrationNumber?: string;
      examinationStartDateTime?: Date;
      buildingId?:number;
      roomId?:number;
      seatNumber?:number;
}