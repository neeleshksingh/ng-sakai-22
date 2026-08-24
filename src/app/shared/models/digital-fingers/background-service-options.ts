import { BaseModel } from '../commons/base-model';

export class BackgroundServiceOptions extends BaseModel {
    isEnabled?: boolean;
    delayInMinutes?: number;
}
