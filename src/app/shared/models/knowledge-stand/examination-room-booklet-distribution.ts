export class ExaminationRoomBookletDistribution {
    
    examinationId?: number;
    buildingId?: number;
    roomId?: number;
    examinationDateTime?:string;
    issueDateTime?: string;
    status?: string;
    createdDate?: string;
    modifiedDate?: string;
    examinationBooklets?: ExaminationBooklet[];
}
export class ExaminationBooklet {
    id?: number;
    bookletNumber?: number;
    isIssued?: boolean;
    isReturned?: boolean;
}
export class ExaminationRoomBookletDistributionResponse extends ExaminationRoomBookletDistribution {
    examinationName?: string;
    buildingName?: string;
    roomNumber?: string;
}