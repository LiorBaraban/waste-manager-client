import { DbBuilding } from './../AtomicDataModels/DbBuilding';
import { LutItem } from "../AtomicDataModels/LutItem";
import { BuildingData } from "../AtomicDataModels/BuildingData";

export class BuildingAreaManagementViewModel{
    areas : Array<LutItem>;
    buildings : Array<DbBuilding>

}