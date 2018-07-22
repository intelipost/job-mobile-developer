import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LocationProvider } from '../../providers/location';

@IonicPage()
@Component({
    selector: 'page-locations',
    templateUrl: 'locations.html',
})
export class LocationsPage {
    private locations: any[];

    constructor(public navCtrl: NavController, public navParams: NavParams, private locationProvider: LocationProvider) {
        this.getLastLocations();
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
}
