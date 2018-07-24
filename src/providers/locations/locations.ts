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
export class LocationsProvider {
  public locationsList: Array<any>;
  public baseUrl = "http://requestbin.fullcontact.com/114p0ht1";

  constructor(
    public dataBaseProvider: DataBaseProvider,
    public http: Http
  ) {
    this.locationsList = [];
  }

  getAllLocations(userID, status) {
    return this.dataBaseProvider.getDB()
      .then((db: SQLiteObject) => {
        let query = 'SELECT * FROM locations WHERE user_id = ? AND status = ? ORDER BY id DESC';
        let data = [userID, status];
        this.locationsList = [];
        return db.executeSql(query, data)
          .then(data => {
            if(data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                this.locationsList.push(data.rows.item(i));
              }
              return this.locationsList;
            }
          })
          .catch(err => console.log('Erro ao buscar localizações:', err)
        )
      }
    )
  }

  sendLocations(obj): Observable<any> {
    return this.http.post(this.baseUrl, obj)
      .map(response => {
        return response.json();
      });
  }

}
