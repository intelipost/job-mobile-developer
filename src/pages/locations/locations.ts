import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ToastController, LoadingController } from 'ionic-angular';
import { LocationProvider } from '../../providers/location';
import { CameraProvider } from '../../providers/camera';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
    selector: 'page-locations',
    templateUrl: 'locations.html',
})
export class LocationsPage {
    private locations: any[];

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        private locationProvider: LocationProvider,
        private cameraProvider: CameraProvider,
        private events: Events,
        private toast: ToastController,
        private http: HttpClient,
        private loadingCtrl: LoadingController
    ) {
        this.getLastLocations();

        this.events.unsubscribe('new-location');
        this.events.subscribe('new-location', () => {
            this.getLastLocations();
        })
    }

    changeWatchPosition() {
        if (this.locationProvider.isActive()) {
            this.locationProvider.stopWatchPosition();
        } else {
            this.locationProvider.startWatchPosition();
        }
    }

    isActive() {
        this.locationProvider.isActive();
    }

    getLastLocations() {
        this.locationProvider.getLastLocations().subscribe(res => {
            this.locations = res;
        });
    }

    sync() {
        this.cameraProvider.takePhoto().subscribe(image => {
            let loading;
            loading = this.loadingCtrl.create({
                showBackdrop: true,
                content: 'Aguarde...'
            });
            loading.present();

            this.locationProvider.getLocationsNotSynced().subscribe(locations => {
                if (locations.length == 0) {
                    loading.dismiss();
                    this.toast.create({ message: 'Nenhuma localização para sincronizar', duration: 2000 }).present();
                } else {
                    this.http.post('http://requestbin.fullcontact.com/160n5jh1', { image: image, locations: locations }).subscribe(res => {
                        loading.dismiss();

                        this.locationProvider.updateLocationsAsSynced(locations);

                        this.toast.create({ message: 'Localizações sincronizadas!' }).present();
                    }, err => { 
                        loading.dismiss();
                        console.error(err);
                        this.toast.create({ message: 'Falha ao sincronizar as localizações', duration: 2000 }).present();
                    })
                }
            })
        }, err => {
            console.error('falha ao acessar a camera', err);
        })
    }
}
