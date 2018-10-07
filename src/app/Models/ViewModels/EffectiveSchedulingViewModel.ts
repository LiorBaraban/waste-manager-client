import { BinData } from "../AtomicDataModels/BinData";
import { LutItem } from "../AtomicDataModels/LutItem";
import { BinType } from "../AtomicDataModels/BinType";
import { BuildingData } from "../AtomicDataModels/BuildingData";
import { TruckData } from "../AtomicDataModels/TruckData";
import { AreaData } from "../AtomicDataModels/AreaData";

export class EffectiveSchedulingViewModel{
    areas : Array<AreaData>;
    trucks : Array<TruckData>;
}

