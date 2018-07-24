import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
@IonicPage()
@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
  ) {
  }

  ionViewDidLoad() {
    //verica se o usuário tem sessão ativa
    this.storage.get('isUserLogged').then((isUserLogged) => {
      if (isUserLogged) {
        this.navCtrl.setRoot(HomePage)
      }
    });
  }

  signIn() {
    this.navCtrl.push(LoginPage);
  }

  signUp() {
    this.navCtrl.push(SignUpPage);
  }




}
