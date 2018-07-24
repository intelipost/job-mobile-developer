import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';
import { Storage } from '@ionic/storage';
import { DataBaseProvider } from '../data-base/data-base';

@Injectable()
export class GeolocationServiceProvider {

  public lat;
  public lng;
  public timedate;
  public userLogged: Array<any> = [];
  public dateCurrent;
  public locations: Array<any> = [];
  
  constructor(
    private geolocation: Geolocation,
    private storage: Storage,
    private dataBaseProvider: DataBaseProvider
  ) {
    this.storage.get('userLogged').then((response) => {
      this.userLogged = response;
    });
  }

  setLocations(obj) {
    return this.dataBaseProvider.getDB()
      .then((db: SQLiteObject) => {
        let query = 'INSERT INTO locations(lat, lng, time, status, user_id) VALUES (?, ?, ?, ?, ?)';
        let data = [obj.lat, obj.lng, obj.time, obj.status, obj.userID];
        return db.executeSql(query, data)
          .catch(err => console.log('Error ao inserir o localização:', err)
        )
      }
    )
  }

  getCurrentLocation() {
    return this.geolocation.getCurrentPosition().then((resp) => {
      this.getCurrentTime();
      let arrPosition = {
        'userID': this.userLogged['id'],
        'lat': resp.coords.latitude,
        'lng': resp.coords.longitude,
        'time': this.timedate,
        'status': 0
      }
      this.locations.push(arrPosition);
      this.setLocations(arrPosition).then(response => {
        return true;
      }).catch(e => {
        console.log("Erro ao salvar localização: "+ e);
      })
      return this.locations;
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }

  getVerifyLocation() {
    return this.geolocation.getCurrentPosition().then((resp) => {
        return resp.coords.latitude;
      }).catch(e => {
        console.log("Erro ao salvar localização: "+ e);
      });
  }
  

  getCurrentTime() {
    let todayDate = new Date();
    let day = todayDate.getDay();
    let month = todayDate.getMonth();
    let year = todayDate.getFullYear();
    let hour = todayDate.getHours();
    let minutes = todayDate.getMinutes();
    minutes < 10 ? this.timedate = hour.toString() + ":0" + minutes.toString() : this.timedate = hour.toString() + ":" + minutes.toString();
  }

}
