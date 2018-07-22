import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

const LOCATION_INTERVAL = 180000;

@Injectable()
export class LocationProvider {
    private intervalId: any;

    constructor(private platform: Platform, private geolocation: Geolocation) {
    }

    startWatchPosition() {
        this.getLocation().subscribe(res => {
            this.intervalId = setInterval(() => {
            }, LOCATION_INTERVAL)
        })
    }

    stopWatchPosition() {
        clearInterval(this.intervalId);
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
