import { Suggestion } from './../Models/AtomicDataModels/Suggestion';
import { Injectable } from '@angular/core';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class EfficientAllocationService {

  controller: string;

  constructor(private appService: AppService) { 
    this.controller = 'Building';
  }

  async GetEfficientAllocationViewModel(){
    return await this.appService.get(this.controller, 'GetEfficientAllocationViewModel');
  }

  async GetAreaDesc(areaId : number){
    return await this.appService.get(this.controller, 'GetAreaDesc', '?areaId='+areaId);
  }

  async GetNumberOfDays(buildingId : number){
    return await this.appService.get(this.controller, 'GetNumberOfDays', '?buildingId='+buildingId);
  }

  async GetBinsAreaDisposal(buildingId : number){
    return await this.appService.get(this.controller, 'GetBinsAreaDisposal', '?buildingId='+buildingId);
  }

  async GetAvgCapacity(buildingId : number){
    return await this.appService.get(this.controller, 'GetAvgCapacity', '?buildingId='+buildingId);
  }

  async HandleEfficientCapacity(buildingId : number){
    return await this.appService.get(this.controller, 'HandleEfficientCapacity', '?buildingId='+buildingId);
  }

  async GetDayDesc(dayId : number){
    return await this.appService.get(this.controller, 'GetDayDesc', '?dayId='+dayId);
  }

  async GetBinDesc(dayId : number){
    return await this.appService.get(this.controller, 'GetBinDesc', '?binTypeId='+dayId);
  }

  async ImplementSuggestion(suggestion : Suggestion, buildingId : number){
    return await this.appService.post(this.controller, 'ImplementSuggestion', {
      suggestion: suggestion,
      buildingId: buildingId
    }); 
  }
}
