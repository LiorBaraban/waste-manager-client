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

  async updateBin(binDetails: BinData, date: Date){

    // mockup:
    
    // await this.appService.put(this.controller, '...', {
    //   binDetails : binDetails,
    //   date : date
    // });

  }
  
}
