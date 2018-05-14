import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { LocationsPage } from '../pages/locations/locations';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { LocalDbProvider } from '../providers/local-db/local-db';
import { Geolocation } from '@ionic-native/geolocation';
import { LocationsProvider } from '../providers/locations/locations';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpProvider } from '../providers/http/http';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LocationsPage
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
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
    HttpClientModule,
    HttpProvider,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
