import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { GeolocationServiceProvider } from '../../providers/geolocation-service/geolocation-service';
import { LocationsProvider } from '../../providers/locations/locations';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public locations;
  public userLogged: Array<any> = [];

  constructor(
    private navCtrl: NavController,
    private menu: MenuController,
    private geolocationService: GeolocationServiceProvider,
    private storage: Storage,
    private camera: Camera,
    private locationsProvider: LocationsProvider,
    private utilService: UtilServiceProvider,
    private transfer: FileTransfer,
    private file: File
  ) {
    this.menu.enable(true);
    this.storage.get('userLogged').then((response) => {
      this.userLogged = response;
    });
  }

  ngOnInit() {
    this.setLocations();
  }

  setLocations() {
    this.storage.get('userLogged').then((response) => {
      this.userLogged = response;
      console.log("response");
      console.log(response);
      this.geolocationService.getCurrentLocation().then(response => {
        this.getLocations();
      }).catch(e => {
        console.log('Erro ao pegar a primeira localização: ' + e);
      })
    });
    
  }


  getLocations() {
    this.locationsProvider.getAllLocations(this.userLogged['id'], 0).then(response => {
      this.locations = response;
    });
  }

}
