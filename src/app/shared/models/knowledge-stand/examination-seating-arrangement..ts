import { BaseModel } from "../commons/base-model";

export class ExaminationSeatingArrangement extends BaseModel
{

    roomId?: number;
    examinationId?: number;
    roomAllocationGroupId?:number;
    startDateTime?: string;
    endDateTime?: string;
    rowSequence?: number;
    c01?: number;
    c02?: number;
    c03?: number;
    c04?: number;
    c05?: number;
    c06?: number;
    c07?: number;
    c08?: number;
    c09?: number;
    c10?: number;
    c11?: number;
    c12?: number;
    c13?: number;
    c14?: number;
    c15?: number;
    c16?: number;
    c01Student?: StudentSeatingData;
    c02Student?: StudentSeatingData;
    c03Student?: StudentSeatingData;
    c04Student?: StudentSeatingData;
    c05Student?: StudentSeatingData;
    c06Student?: StudentSeatingData;
    c07Student?: StudentSeatingData;
    c08Student?: StudentSeatingData;
    c09Student?: StudentSeatingData;
    c10Student?: StudentSeatingData;
    c11Student?: StudentSeatingData;
    c12Student?: StudentSeatingData;
    c13Student?: StudentSeatingData;
    c14Student?: StudentSeatingData;
    c15Student?: StudentSeatingData;
    c16Student?: StudentSeatingData;
   
    
}
export class StudentSeatingData
{
    rollNumber?:string;
    registrationNumber?:string;
    studentExaminationRegistrationId?:number;
    subjectPaperCodeName?:string;
}