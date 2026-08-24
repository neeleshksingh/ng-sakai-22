import { AuditModel } from "../commons/audit-model";

export class ServiceRequestWorkflow extends AuditModel{
  id?: number;
  serviceRequestId?: number;
  userName?: string;
  resolutionMessage?: string;
  visibleToRequestor?: boolean;
  tags?: string;
  status?: string
}