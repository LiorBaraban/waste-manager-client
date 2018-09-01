import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { BinData } from 'src/app/Models/AtomicDataModels/BinData';

@Injectable({
  providedIn: 'root'
})
export class BinManagementService {

 
  controller: string;

  constructor(private appService: AppService) { 
    this.controller = 'Bins';
  }

  async getAllBins(){
    return await this.appService.get(this.controller, 'GetAllBins');
  }

  async getBinManagementViewModel(){
    return await this.appService.get(this.controller, 'GetBinManagementViewModel');
  }

  async deleteBin(id : number){
    // await this.appService.delete(this.controller, 'DeleteBin', {binId = id};); // How to delete bin without body? 
  }

  async updateBin(binDetails: BinData){

    await this.appService.post(this.controller, "UpdateBin", {
      binId: binDetails.binId,
      binTypeId: binDetails.binTypeId,
      buildingId: binDetails.buildingId,
      binTypeDesc: binDetails.binTypeDesc,
      cityAddress: binDetails.cityAddress,
      streetAddress: binDetails.streetAddress,
      currentCapacity: binDetails.currentCapacity,
      maxCapacity: binDetails.maxCapacity,
      binTrashDisposalArea: binDetails.binTrashDisposalArea
    });
    // mockup:
    
    // await this.appService.put(this.controller, '...', {
    //   binDetails : binDetails,
    //   date : date
    // });

  }

  async addBin(binDetails: BinData){
    await this.appService.post(this.controller, "AddNewBin", {
      // binId : binDetails.binId,
      binTypeId : binDetails.binTypeId,
      buildingId :binDetails.buildingId,
      binTypeDesc :binDetails.binTypeDesc,
      cityAddress :binDetails.cityAddress,
      streetAddress :binDetails.streetAddress,
      currentCapacity :binDetails.currentCapacity,
      maxCapacity :binDetails.maxCapacity,
      binTrashDisposalArea :binDetails.binTrashDisposalArea,
    });
  }
  
}
