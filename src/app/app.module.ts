import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomePage } from '../pages/home/home';
import { LocationsPage } from '../pages/locations/locations';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Geolocation } from '@ionic-native/geolocation';

import { LocalDbProvider } from '../providers/local-db/local-db';
import { LocationsProvider } from '../providers/locations/locations';
import { GeolocationProvider } from '../providers/geolocation/geolocation';
import { HttpProvider } from '../providers/http/http';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocationsPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LocationsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    LocalDbProvider,
    LocationsProvider,
    Geolocation,
    Camera,
    GeolocationProvider,
    HttpProvider,
    HttpClientModule,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
