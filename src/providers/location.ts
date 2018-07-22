import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { DatabaseProvider } from './database';

const LOCATION_INTERVAL = 180000;

@Injectable()
export class LocationProvider {
    private intervalId: any;
    private active_watch: boolean;

    constructor(
        private platform: Platform, 
        private geolocation: Geolocation,
        private database: DatabaseProvider
    ) {
    }

    startWatchPosition() {
        this.active_watch = true;

        this.getLocation().subscribe(res => {
            //armazena a primeira localização
            this.saveLocation(res);

            //inicia o processo para capturar a localização a cada 3 minutos
            this.intervalId = setInterval(() => {
                this.getLocation().subscribe(res => {
                    this.saveLocation(res);
                })
            }, LOCATION_INTERVAL)
        })
    }

    stopWatchPosition() {
        this.active_watch = false;
        clearInterval(this.intervalId);
    }

    saveLocation(location) {
        this.database.executeSql('INSERT INTO locations(date, latitude, longitude, sync) VALUES(?,?,?,?)', [location.date, location.latitude, location.longitude, false]).subscribe(res => {
            console.log('coordenadas armazenada');
        }, err => {
            console.error('falha ao salvar a localização', err);
        })
    }
    
    getLocation() {
        return Observable.create(observer => {
            if (this.platform.is('cordova')) {
                //obtém a localização com modo de alta precisão
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
                //localização fake para rodar fora do device no ambiente de teste
                observer.next({
                    longitude: -3.60512,
                    latitude: 55.070859,
                    date: new Date()
                });
                observer.complete();
            }
        })  
    }

    isActive() {
        return this.active_watch;
    }

    getLastLocations() {
        return Observable.create(observer => {
            this.database.executeSql('SELECT * FROM locations order by date desc LIMIT 10').subscribe(res => {
                let result = [];

                for (let i = 0; i < res.rows.length; i++) {
                    result.push(res.rows.item(i));
                }

                observer.next(result);
                observer.complete();
            }, err => {
                observer.error(err);
            })
        })
    }
}
