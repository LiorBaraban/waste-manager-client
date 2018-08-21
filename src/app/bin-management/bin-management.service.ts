import { Injectable } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Injectable({
  providedIn: 'root'
})
export class BinManagementService {

 
  controller: string;

  constructor(private appService: AppService) { 
    this.controller = 'Bin';
  }

  async getAllBins(){
    return await this.appService.get(this.controller, 'GetAllBins');
  }
  
}
