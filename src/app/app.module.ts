import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { LocalizacaoPage } from '../pages/localizacao/localizacao';
import { NoticiasPage } from '../pages/noticias/noticias';
import { NoticiaDetalhePage } from '../pages/noticia-detalhe/noticia-detalhe';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { SQLite } from '@ionic-native/sqlite';
import { IonicStorageModule } from '@ionic/storage';
import { GeolocalizacaoServiceProvider } from '../providers/geolocalizacao-service/geolocalizacao-service';
import { NoticiasServiceProvider } from '../providers/noticias-service/noticias-service';

import { PipesModule } from '../pipes/pipes.module';
import { SincronizacaoServiceProvider } from '../providers/sincronizacao-service/sincronizacao-service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MyApp,
    LocalizacaoPage,
    NoticiaDetalhePage,
    NoticiasPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    PipesModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LocalizacaoPage,
    NoticiaDetalhePage,
    NoticiasPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Geolocation,
    Camera,
    InAppBrowser,
    SQLite,
    GeolocalizacaoServiceProvider,
    NoticiasServiceProvider,
    SincronizacaoServiceProvider
  ]
})
export class AppModule {}
