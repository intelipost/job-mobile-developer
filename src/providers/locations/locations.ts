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
  public locations: Array<any> = [];
  public baseUrl = "https://api.myjson.com/bins";

  constructor(
    public dataBaseProvider: DataBaseProvider,
    public http: Http
  ) {}


  insertLocations(obj) {
    return this.dataBaseProvider.getDB()
      .then((db: SQLiteObject) => {
        let query = "INSERT INTO locations(time, lng, lat) VALUES (?, ?, ?)";
        let data = [obj.time, obj.lng, obj.lat];

        return db.executeSql(query, data)
          .catch(err => console.log('Error ao inserir a localização:', err)
        )
      }
    )
  }

  getAllLocations() {
    return this.dataBaseProvider.getDB()
      .then((db: SQLiteObject) => {
        let query = "SELECT * FROM locations ORDER BY id DESC";
        let data = [];
        return db.executeSql(query, data)
          .then(data => {
            if(data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                this.locations.push(data.rows.item(i));
              }
              return this.locations;
            }
          })
          .catch(err => console.log('Erro ao buscar as localizações:', err)
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
