import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Injectable()
export class LocationProvider {
    constructor(private platform: Platform, private geolocation: Geolocation) {
    }
    
    getLocation() {
        return Observable.create(observer => {
            if (this.platform.is('cordova')) {
                this.geolocation.getCurrentPosition({
                    timeout: 6000,
                    enableHighAccuracy: true
                }).then(res => {
                    observer.next({
                        latitude: res.coords.latitude,
                        longitude: res.coords.longitude,
                        date: new Date()
                    });
                    observer.complete();
                }).catch((err) => {
                    console.error('Error getting location', err);
                    observer.error(err);
                });             
            } else {
                observer.next({
                    longitude: -3.60512,
                    latitude: 55.070859,
                    date: new Date()
                });
                observer.complete();
            }
        })  
    }
}
