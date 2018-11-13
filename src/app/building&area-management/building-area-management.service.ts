import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { DbBuilding } from '../Models/AtomicDataModels/DbBuilding';

@Injectable({
  providedIn: 'root'
})
export class BuildingAreaManagementService {

  controller: string;

  constructor(private appService: AppService) {
    this.controller = 'Building';
   }

   async BuildingAreaManagementViewModel(){
     return await this.appService.get(this.controller, 'GetBuildingAreaManagementViewModel');
   }

   async DeleteBuilding(buildingId : number){
     await this.appService.delete(this.controller, 'DeleteBuilding', 'buildingId='+buildingId);
   }

   async AddBuilding(building : DbBuilding){
     await this.appService.post(this.controller, 'AddBuilding', {
      streetName : building.streetName,
      streetNumber : building.streetNumber,
      buildingId : building.buildingId,
      areaId : building.areaId,
      trashDisposalArea : building.trashDisposalArea
     })
   }
}
