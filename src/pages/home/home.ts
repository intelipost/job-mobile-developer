import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { LocationsPage } from '../locations/locations';

import { GeolocationProvider } from '../../providers/geolocation/geolocation';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lat;
  public lng;
  public timedate;

  constructor(public navCtrl: NavController, public geolocation: Geolocation) {
    
  }

  ionViewDidLoad() {
    this.getCurrentLocation();
  }

  // Opções para ativar alta precisão na hora de retornar coordenadas
  locationOptions = {
    enableHighAccuracy: true
  }
  
  // Pega as coordenadas atuais quando a view é carregada e começa a chamar a função que irá retornar
  // as coordenadas a cada três minutos
  getCurrentLocation() {
    this.geolocation.getCurrentPosition(this.locationOptions).then((resp) => {
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.watchPosition();
      this.getCurrentTime();
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  // Timeout de 3minutos pra chamar novamente a função que pega as coordenadas
  watchPosition() {
    setTimeout(() => {
      this.getCurrentLocation();
    }, 
    180000);
  }

  // Pega hora e minutos
  getCurrentTime() {
    let todayDate = new Date();
    let hour = todayDate.getHours();
    let minutes = todayDate.getMinutes();
    this.timedate = hour.toString() + ":" + minutes.toString();
  }

  locationsPage() {
    this.navCtrl.push(LocationsPage);
  }

}
