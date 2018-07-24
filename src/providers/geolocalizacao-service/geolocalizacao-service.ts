import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';


@Injectable()
export class GeolocalizacaoServiceProvider {

  constructor(private _geolocation: Geolocation) {
    
  }

  getPosicaoAtual(){
    return new Promise ((resolve, reject) => {
      this._geolocation.getCurrentPosition().then((resp) => {
        resolve([resp.coords.latitude, resp.coords.longitude, resp.timestamp]);
      }).catch((error) => {
        reject(error);
      });
    });  
  }



}
