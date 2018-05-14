import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { LocationsPage } from '../locations/locations';

import { LocationsProvider } from '../../providers/locations/locations';
import { HttpProvider } from '../../providers/http/http';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera, CameraOptions } from '@ionic-native/camera';

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

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public locationsProvider: LocationsProvider, public httpProvider: HttpProvider, 
              private camera: Camera, private alertCtrl: AlertController) {
    
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
      // Insere localização no banco
      this.locationsProvider.insertLocations(this.locationObj)
        .then(res => { 
          // Pega localizações após inserir
          this.locationsProvider.getAllLocations()
            .then(res => {
              // Trata array após pegar localizações
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
    minutes < 10 ? this.timedate = hour.toString() + ":0" + minutes.toString() : this.timedate = hour.toString() + ":" + minutes.toString()
  }

  //Envia localizações e imagem tirada com camera para o servidor 
  syncData() {

    const options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      let postObj = {
        'image': base64Image,
        'locations': this.locationsProvider.locations
      }
      this.httpProvider.sendData(postObj).subscribe(res => {
        let confirmationAlert = this.alertCtrl.create({
          title: 'Enviado com sucesso!',
          buttons: ['OK']
        });
        confirmationAlert.present();
      });
    }, (err) => {
      console.log(err);
    });
  }

  locationsPage() {
    this.navCtrl.push(LocationsPage);
  }

}
