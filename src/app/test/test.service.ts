import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { promise } from 'selenium-webdriver';
import { resolve, reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private http: Http) { 
  }

  // private currentPriceUrl = 'http://api.coindesk.com/v1/bpi/currentprice.json';

  // constructor(private http: Http) { }

  // async getPrice(currency: string): Promise<number> {
  //   const response = await this.http.get(this.currentPriceUrl).toPromise();
  //   return response.json().bpi[currency].rate;
  // }

  async getAllBins(): Promise<any>{
    let response = await this.http.get('http://localhost:3118/api/Test/GetAllBins').toPromise();
    return response.json();

  }


  // getAllBins(){
  //   let p: Promise<any> = this.http.get('http://localhost:3118/api/Test/GetAllBins').toPromise();
  //   p.then(result => {
  //     resolve(result);
  //   }).catch(error =>{
  //     reject(error);
  //   })
  //   return 
  //   // promise
  //   // .then(response => {
  //   //   return response;
  //   // })
  //   // .catch(error => {
  //   //   return error;
  //   // })
  // }

}
