import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { LocationsPage } from '../locations/locations';

import { LocationsProvider } from '../../providers/locations/locations';

import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public lat;
  public lng;
  public timedate;
  public locationObj;
  public latestLocations;

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public locationsProvider: LocationsProvider) {
    
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
    this.getCurrentTime();
    this.geolocation.getCurrentPosition(this.locationOptions).then((resp) => {
      this.watchPosition(); // função pra continuar loop de verificação de coords
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      this.locationObj = {
        time: this.timedate,
        lat: this.lat,
        lng: this.lng
      }
      //Insere localização no banco
      this.locationsProvider.insertLocations(this.locationObj)
        .then(res => { 
          //Pega localizações após inserir
          this.locationsProvider.getAllLocations()
            .then(res => {
              //Trata array após pegar localizações
              this.getLatestLocations() 
            }
          );
        }
      );
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  //Pega as três ultimas localizações da base para exibir na home
  getLatestLocations() {
    this.latestLocations = this.locationsProvider.locations.slice(0, 3);
  }

  // Timeout de 3 minutos pra chamar novamente a função que pega as coordenadas
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
