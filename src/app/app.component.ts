import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { LoginPage } from '../pages/login/login';
import { LocationsPage } from '../pages/locations/locations';
import { ContactPage } from '../pages/contact/contact';
import { ProfilePage } from '../pages/profile/profile';
import { InitialPage } from '../pages/initial/initial';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { DataBaseProvider } from '../providers/data-base/data-base';
import { GeolocationServiceProvider } from '../providers/geolocation-service/geolocation-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public rootPage: any = InitialPage;

  public pages: Array<{ title: string, component: any }>;
  public locations;
  public userLogged: Array<any> = [];

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private app: App,
    private storage: Storage,
    private dataBaseProvider: DataBaseProvider,
    private geolocationService: GeolocationServiceProvider,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      //cria o banco de dados
      this.dataBaseProvider.createDatabase();
      // monta o menu
      this.pages = [
        { title: 'Home', component: HomePage },
        { title: 'Minhas Localizações', component: LocationsPage },
        { title: 'Sobre', component: AboutPage },
        { title: 'Contato', component: ContactPage },
        { title: 'Meus Dados', component: ProfilePage },
        { title: 'Sair', component: LoginPage }
      ];
      //verica se o usuário fez o login
      this.storage.get('isUserLogged').then((isUserLogged) => {
        if (!isUserLogged) {
          this.rootPage = InitialPage;
          this.splashScreen.hide();
        } else {
          this.storage.get('userLogged').then((response) => {
            this.userLogged = response;
            this.setCaptureLocation();
          });
          //Verificando se é o primeiro acesso
          /**
           * this.storage.get('onBoardingCompleted').then((onBoardingCompleted) => {
            this.rootPage = onBoardingCompleted ? "HomePage" : "OnboardingPage";
            this.splashScreen.hide();
          });
           */
        }
      });
    });
  }

  setCaptureLocation() {
    this.geolocationService.getCurrentLocation().then(response => {
      if (response) {
        // Timeout de 5 segundos pra chamar novamente a função que pega as coordenadas
        setTimeout(() => {
          this.setCaptureLocation();
        }, 5000);
      }
    }).catch(e => {
      console.log("Erro na captura da localização:" + e);
    })
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
