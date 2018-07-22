import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
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
import { DataBaseProvider } from '../providers/data-base/data-base';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;
  userLogged;
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private app: App,
    private storage: Storage,
    private dataBaseProvider: DataBaseProvider
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
        { title: 'Cadastro', component: SignUpPage },
        { title: "Boas vindas", component: InitialPage },
        { title: 'Apresentação', component: PresentationPage },
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
