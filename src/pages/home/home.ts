import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

import { LocationsPage } from '../locations/locations';

import { LocationsProvider } from '../../providers/locations/locations';
import { GeolocationProvider } from '../../providers/geolocation/geolocation';
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

  constructor(public navCtrl: NavController, public geolocation: Geolocation, public locationsProvider: LocationsProvider, public httpProvider: HttpProvider, public geolocationProvider: GeolocationProvider, 
              private camera: Camera, private alertCtrl: AlertController) {
    
  }

  ionViewDidLoad() {
    this.geolocationProvider.getCurrentLocation();
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
