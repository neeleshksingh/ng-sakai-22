export class RazorOrderResponse {
    id?: string;
    entity?: string;
    amount?: number;
    amountPaid?: number;
    amountDue?: number;
    currency?: string;
    receipt?: string;
    status?: string;
    attempts?: number;
    notes?: any[];
    createdAt?: Date
}