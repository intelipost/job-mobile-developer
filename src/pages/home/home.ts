import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { GeolocationServiceProvider } from '../../providers/geolocation-service/geolocation-service';
import { LocationsProvider } from '../../providers/locations/locations';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';


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
    private utilService: UtilServiceProvider
  ) {
    this.menu.enable(true);
    this.storage.get('userLogged').then((response) => {
      this.userLogged = response;
    });
  }

  ionViewDidEnter() {
    //this.getAllLocations();
  }

  ngOnInit() {
    this.getAllLocations();
  }

  getAllLocations() {
    this.geolocationService.getAllLocations(this.userLogged['id'], 0).then(response => {
      this.locations = response;
      // Timeout de 5 segundos pra chamar novamente a função que pega as coordenadas
      setTimeout(() => {
        this.getAllLocations();
      }, 
      5000);
    })
  }

  synchronize(base64Image) {
    let objData;
    this.geolocationService.getAllLocations(this.userLogged['id'], 0).then(response => {
      this.locations = response;
      objData = {
        'image': base64Image,
        locations: this.locations
      };

      this.locationsProvider.sendLocations(objData).subscribe(response => {
        if(response){
          this.utilService.presentToast('Informações sincronizadas com sucesso.');
          console.log(response);
        }
      })
    })
  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.synchronize(base64Image);
    }, (err) => {
     // Handle error
    });
  }
  
}
