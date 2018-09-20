import { BinData } from "../AtomicDataModels/BinData";
import { LutItem } from "../AtomicDataModels/LutItem";
import { BinType } from "../AtomicDataModels/BinType";
import { BuildingData } from "../AtomicDataModels/BuildingData";

export class BinManagementViewModel{
    bins : Array<BinData>;
    areas : Array<LutItem>;
    binTypes : Array<BinType>;
    buildings : Array<BuildingData>
}