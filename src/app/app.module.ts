import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { IonicStorageModule, Storage } from '@ionic/storage';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { LocationsPage } from '../pages/locations/locations';
import { LocationPage } from '../pages/location/location';
import { ContactPage } from '../pages/contact/contact';
import { ProfilePage } from '../pages/profile/profile';
import { PresentationPage } from '../pages/presentation/presentation';
import { InitialPage } from '../pages/initial/initial';
import { SignUpPage } from '../pages/sign-up/sign-up';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';

//providers
import { DataBaseProvider } from '../providers/data-base/data-base';
import { UsersProvider } from '../providers/users/users';
import { LocationsProvider } from '../providers/locations/locations';
import { UtilServiceProvider } from '../providers/util-service/util-service';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    LocationsPage,
    LocationPage,
    ContactPage,
    ProfilePage,
    PresentationPage,
    InitialPage,
    SignUpPage
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AboutPage,
    LoginPage,
    LocationsPage,
    LocationPage,
    ContactPage,
    ProfilePage,
    PresentationPage,
    InitialPage,
    SignUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    DataBaseProvider,
    UsersProvider,
    LocationsProvider,
    UtilServiceProvider
  ]
})
export class AppModule {}
