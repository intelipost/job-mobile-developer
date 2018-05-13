import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

import { HomePage } from '../pages/home/home';

import { LocalDbProvider } from '../providers/local-db/local-db';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, sqlite: SQLite, public localDB: LocalDbProvider) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
      this.localDB.createTables();
    });
  }
}
