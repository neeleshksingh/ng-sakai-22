export class BatchScheduleEvent {
    id?: number;
    title?: string;
    description?: string;
    start?: string;
    end?: string;
    url?: string;
}
export class BatchScheduleEventData {
    data: BatchScheduleEvent[]=[];
}