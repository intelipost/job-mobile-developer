import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { GeolocationServiceProvider } from '../../providers/geolocation-service/geolocation-service';
import { LocationsProvider } from '../../providers/locations/locations';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { Storage } from '@ionic/storage';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-locations',
  templateUrl: 'locations.html',
})
export class LocationsPage {
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
    this.storage.get('userLogged').then((response) => {
      this.userLogged = response;
      this.getLocations();
    });
  }

  ionViewWillEnter() {
    this.getLocations();
  }

  ionViewDidEnter() {
    this.getLocations();
  }

  getLocations() {
    this.locationsProvider.getAllLocations(this.userLogged['id'], 0).then(response => {
      this.locations = response;
    });
  }

  // full example
  upload(base64Image) {
    this.utilService.openLoading();
    const fileTransfer: FileTransferObject = this.transfer.create();
    let options: FileUploadOptions = {
      fileKey: 'image',
      fileName: 'file.jpg',
      chunkedMode: false,
      mimeType: "multipart/form-data",
      headers: {},
      params: {
        locations: this.locations
      }
    }

    fileTransfer.upload(base64Image, 'https://api.myjson.com/bins', options)
      .then((data) => {
        this.utilService.closeLoading();
        this.utilService.presentToast('Informações sincronizadas com sucesso.');
      }, (err) => {
        this.utilService.closeLoading();
        // error
        console.log(err);
        this.utilService.presentToast('Não foi possível realizar a sincronização.');
      })
  }


  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      cameraDirection: 0,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      console.log(imageData);
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.upload(base64Image);
    }, (err) => {
      // Handle error
    });
  }
}
