import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataBaseProvider } from '../data-base/data-base';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/finally';

@Injectable()
export class NewsProvider {

  constructor(public http: Http) {
  
  }

  getNews(): Observable<any> {
    return this.http.get('https://newsapi.org/v2/top-headlines?country=br&'+'apiKey=95986afb29974fe0811d3a44461a66d7')
      .map(response => {
        return response.json();
      });
  }


}
