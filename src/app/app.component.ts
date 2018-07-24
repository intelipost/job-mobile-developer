import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { LocationsPage } from '../pages/locations/locations';
import { InitialPage } from '../pages/initial/initial';
import { NewsPage } from '../pages/news/news';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { DataBaseProvider } from '../providers/data-base/data-base';
import { GeolocationServiceProvider } from '../providers/geolocation-service/geolocation-service';
import { UtilServiceProvider } from '../providers/util-service/util-service';
import { NewsProvider } from '../providers/news/news';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = InitialPage;

  public pages: Array<{ title: string, component: any }>;
  public locations;
  public userLogged: Array<any> = [];
  public verificationNavigation;
  public verificationInfoUser;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private app: App,
    private storage: Storage,
    private dataBaseProvider: DataBaseProvider,
    private geolocationService: GeolocationServiceProvider,
    private utilService: UtilServiceProvider
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.geolocationService.getVerifyLocation().then(response => {
        this.init();
      });
    });
  }

  init() {
    this.statusBar.styleDefault();
    //cria o banco de dados
    this.dataBaseProvider.createDatabase();
    // monta o menu
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Minhas Localizações', component: LocationsPage },
      { title: 'Notícias', component: NewsPage },
      { title: 'Sair', component: LoginPage }
    ];
    this.rootPage = InitialPage;

    this.verificationInfoUser = setInterval(() => {
      this.storage.get('userLogged').then((userLogged) => {
        console.log("users ======");
        console.log(userLogged);
        if (userLogged !== null) {
          this.userLogged = userLogged;
          this.setLocations();
          clearInterval(this.verificationInfoUser);
        }
      });
    }, 3000);
  }

  setLocations() {
    this.geolocationService.getCurrentLocation(this.userLogged).then(response => {
      if (response) {
        console.log("Add new location with success.");
      }
    }).catch(e => {
      console.log("Erro na captura da localização:" + e);
    });

    setInterval(() => {
      this.setLocations();
    }, 180000);
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component !== LoginPage) {
      this.nav.push(page.component);
    } else {
      this.logout();
    }

  }

  logout() {
    this.storage.clear();
    const root = this.app.getRootNav();
    root.popToRoot();
    this.nav.setRoot(InitialPage);
  }

}
