import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';
import {HttpModule} from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LocationsPage } from '../pages/locations/locations';
import { InitialPage } from '../pages/initial/initial';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { NewsPage } from '../pages/news/news';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { AndroidPermissions } from '@ionic-native/android-permissions';

//providers
import { DataBaseProvider } from '../providers/data-base/data-base';
import { UsersProvider } from '../providers/users/users';
import { LocationsProvider } from '../providers/locations/locations';
import { UtilServiceProvider } from '../providers/util-service/util-service';
import { GeolocationServiceProvider } from '../providers/geolocation-service/geolocation-service';
import { NewsProvider } from '../providers/news/news';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LocationsPage,
    InitialPage,
    SignUpPage,
    NewsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LocationsPage,
    InitialPage,
    SignUpPage,
    NewsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    Geolocation,
    Camera,
    FileTransfer,
    File,
    AndroidPermissions,
    DataBaseProvider,
    UsersProvider,
    LocationsProvider,
    UtilServiceProvider,
    GeolocationServiceProvider,
    NewsProvider
  ]
})
export class AppModule {}
