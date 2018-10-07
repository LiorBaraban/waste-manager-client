import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { AreaData } from '../Models/AtomicDataModels/AreaData';

@Injectable({
  providedIn: 'root'
})
export class EffectiveSchedulingService {

  controller: string;

  constructor(private appService: AppService) { 
    this.controller = 'Area';
  }

  async GetEffectiveSchedulingViewModel(){
    return await this.appService.get(this.controller, 'GetEffectiveSchedulingViewModel');
  }

  async GetTotalStats(){
    return await this.appService.get(this.controller, 'GetTotalStats');
  }

  async WorkSchedule(){
    return await this.appService.get(this.controller, 'WorkSchedule');
  }

  async GetAreaData(){
    return await this.appService.get(this.controller, 'GetAreaData');
  }

  async GetNumOfCleanups(truckId : number, areaId : number){
    return await this.appService.get(this.controller, 'GetNumOfCleanups', '?truckId='+truckId+'&areaId='+areaId);
  }

  async ManuallyWorkSchedule(updatedArea : Array<AreaData>){
    return await this.appService.post(this.controller, 'ManuallyWorkSchedule', {
      updatedArea: updatedArea
    });
  }

}
