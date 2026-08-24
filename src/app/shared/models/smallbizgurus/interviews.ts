import { BaseModel } from "../commons/base-model";

export class Interviews extends BaseModel {
  interviewStatusId?: number;
  skills?: string;
  expectedRating?: number;
  actualRating?: number;
  comments?: string;
}