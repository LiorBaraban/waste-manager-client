import { LutItem } from "../AtomicDataModels/LutItem";
import { TruckData } from "../AtomicDataModels/TruckData";
import { TruckType } from "../AtomicDataModels/TruckType";

export class TruckManagementViewModel{
    trucks : Array<TruckData>;
    areas : Array<LutItem>;
    truckTypes : Array<TruckType>;
}