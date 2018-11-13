import { Injectable } from '@angular/core';
import { AppService } from '../app.service';
import { BinData } from '../Models/AtomicDataModels/BinData';

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
    let query = `binId=${id}`;
    await this.appService.delete(this.controller, 'DeleteBin', query);
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

  async GetBinsAreaDisposal(buildingId : number){
    return await this.appService.delete('Building', 'GetBinsAreaDisposal', '?buildingId='+buildingId);
  }

  async GetBuildingAreaDisposal(buildingId : number){
    return await this.appService.delete('Building', 'GetBuildingAreaDisposal', '?buildingId='+buildingId);
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
