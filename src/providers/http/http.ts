import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HttpProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpProvider {

  public baseUrl = "https://api.myjson.com/bins";

  constructor(public http: HttpClient) {
  }

  sendData(data) {
    return this.http.post(this.baseUrl, data);
  }

}
