import { Injectable } from '@angular/core';
import { LocalDbProvider } from '../local-db/local-db';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the LocationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocationsProvider {

  public locations = []; 

  constructor(public localDdProvider: LocalDbProvider) {
  }

  insertLocations(obj) {
    return this.localDdProvider.getDb()
      .then((db: SQLiteObject) => {
        let query = "insert into locations(time, lng, lat) values (?, ?, ?)";
        let data = [obj.time, obj.lng, obj.lat];

        return db.executeSql(query, data)
          .catch(err => console.log('Erro na hora de inserir localização:', err)
        )
      }
    )
  }

  getAllLocations() {
    return this.localDdProvider.getDb()
      .then((db: SQLiteObject) => {
        let query = "select * from locations order by id desc";
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
          .catch(err => console.log('Erro na hora de pegar localizações:', err)
        )
      }
    )
  }

}
