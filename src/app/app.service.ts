import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  // $$ TODO - move url to config file
  url: string = 'http://localhost:3118/api'

  constructor(private http: Http) { }

  async get(controller, action, param?) {
    try {
      if (param != null) {
        let response = await this.http.get(`${this.url}/${controller}/${action}/${param}`).toPromise();
        return response.json();
      } else {
        let response = await this.http.get(`${this.url}/${controller}/${action}`).toPromise();
        return response.json();
      }
    } catch (error) {
      console.log("GET failed!")
      console.log(error);
    }

  }

  async post(controller, action, body) {
    try {
      let response = await this.http.post(`${this.url}/${controller}/${action}`, body).toPromise();
      return response.json();
    } catch (error) {
      console.log("GET failed!")
      console.log(error);
    }
  }

  async put(controller, action, body) {
    try {
      let response = await this.http.put(`${this.url}/${controller}/${action}`, body).toPromise();
      return response.json();
    } catch (error) {
      console.log("GET failed!")
      console.log(error);
    }
  }

  async delete(controller, action, id?) {

    try {
      let response = await this.http.get(`${this.url}/${controller}/${action}/${id}`).toPromise();
      return response.json();
    } catch (error) {
      console.log("GET failed!")
      console.log(error);
    }
  }

}
