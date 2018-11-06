import { TruckData } from './TruckData';
import { LutItem } from './LutItem';

export class AreaData{
    area : LutItem;
    numOfBuildings : number;
    capacity : number;
    maxCapacity : number;
    truckId? : number;
    numOfCleanups : number;
}