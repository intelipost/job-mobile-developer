import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { LocationProvider } from '../../providers/location';
import { CameraProvider } from '../../providers/camera';

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
        private events: Events
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
        this.cameraProvider.takePhoto().subscribe(res => {
            console.log(res);
        }, err => {
            console.error('falaha ao acessar a camera');
        })
    }
}
