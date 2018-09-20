import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { promise } from 'selenium-webdriver';
import { resolve, reject } from 'q';
import { AppService } from '../app.service';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  controller: string;

  constructor(private appService: AppService) { 
    this.controller = 'Test';
  }

  async getAllBins(){
    return await this.appService.get(this.controller, 'GetAllBins');
  }


}
