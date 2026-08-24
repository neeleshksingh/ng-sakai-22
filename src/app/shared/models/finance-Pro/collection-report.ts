export class CollectionReport {
    paymentMonthSequence?: number;
    paymentMonthName?: string;
    monthCollection?: number;
    dailyCollection?: number;
}

export class CollectionReportGraphData {
    labels?: string[];
    datasets?: DataSet[];
}

export class DataSet {
    label?: string;
    borderColor?: string[];
    borderWidth?: number;
    fill?: boolean;
    borderDash?: number[];
    data?: number[];
    pointRadius?: number;
}