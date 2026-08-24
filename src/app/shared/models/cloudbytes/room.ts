import { BaseModel } from "../commons/base-model";

export class Room extends BaseModel {
    seatingCapacity?: number;
    buildingId?: number;
    buildingName?: string;
    floorNumber?: number;
    roomNumber?: string;
    numberOfRows?: number;
    numberOfColumns?: number;
}