import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationProvider } from '../../providers/location';

@IonicPage()
@Component({
    selector: 'page-locations',
    templateUrl: 'locations.html',
})
export class LocationsPage {
    constructor(public navCtrl: NavController, public navParams: NavParams, private locationProvider: LocationProvider) {
    }

    changeWatchPosition() {
        console.log(this.locationProvider.isActive());

        if (this.locationProvider.isActive()) {
            this.locationProvider.stopWatchPosition();
        } else {
            this.locationProvider.startWatchPosition();
        }
    }

    isActive() {
        this.locationProvider.isActive();
    }
}
