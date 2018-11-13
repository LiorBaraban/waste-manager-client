import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { TruckData } from '../Models/AtomicDataModels/TruckData';

@Injectable({
  providedIn: 'root'
})
export class TruckManagementService {

  controller: string;

  constructor(private appService: AppService) { 
    this.controller = 'Trucks';
  }

  async getAllTrucks(){
    return await this.appService.get(this.controller, 'GetAllTrucks');
  }

  async getTruckManagementViewModel(){
    return await this.appService.get(this.controller, 'GetTruckManagementViewModel');
  }

  async deleteTruck(id : number){
    let query = `binId=${id}`;
    await this.appService.delete(this.controller, 'DeleteTruck', query);
  }

  async updateTruck(truckDetails: TruckData){

    await this.appService.post(this.controller, "UpdateTruck", {
      truckId: truckDetails.truckId,
      truckTypeId: truckDetails.truckTypeId,
      areaId: truckDetails.areaId,
      currentCapacity: truckDetails.currentCapacity,
      maxCapacity: truckDetails.maxCapacity,
      truckTypeDesc: truckDetails.truckTypeDesc,
      areaDesc: truckDetails.areaDesc
    });

  }

  async addTruck(truckDetails: TruckData){
    await this.appService.post(this.controller, "AddNewTruck", {
      truckId: truckDetails.truckId,
      truckTypeId: truckDetails.truckTypeId,
      areaId: truckDetails.areaId,
      currentCapacity: truckDetails.currentCapacity,
      maxCapacity: truckDetails.maxCapacity,
      truckTypeDesc: truckDetails.truckTypeDesc,
      areaDesc: truckDetails.areaDesc
    });
  }
}
