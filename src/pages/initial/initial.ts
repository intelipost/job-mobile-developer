import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { SignUpPage } from '../sign-up/sign-up';
@IonicPage()
@Component({
  selector: 'page-initial',
  templateUrl: 'initial.html',
})
export class InitialPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InitialPage');
  }

  signIn() {
    this.navCtrl.push(LoginPage);
  }

  signUp() {
    this.navCtrl.push(SignUpPage);
  }

}
