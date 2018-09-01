import { BinData } from "src/app/Models/AtomicDataModels/BinData";
import { LutItem } from "src/app/Models/AtomicDataModels/LutItem";
import { BinType } from "src/app/Models/AtomicDataModels/BinType";
import { BuildingData } from "../AtomicDataModels/BuildingData";

export class BinManagementViewModel{
    bins : Array<BinData>;
    areas : Array<LutItem>;
    binTypes : Array<BinType>;
    buildings : Array<BuildingData>
}