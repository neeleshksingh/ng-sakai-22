import { AuditModel } from "../commons/audit-model";

export class ServiceRequestWorkflow extends AuditModel{
  id?: number;
  serviceRequestId?: number;
  userName?: string;  
  visibleToRequestor?: boolean;
  resolutionMessage?: string;
  tags?: string;
  status?: string
}