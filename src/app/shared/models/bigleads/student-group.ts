import { AuditModel } from '../commons/audit-model';

export class StudentGroup extends AuditModel {
    id?: number;
    name?: string;
    title?: string;
    description?: string;
    groupColor?: string;
    status?: string;
}
