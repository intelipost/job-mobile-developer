import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
  ) {
    this.menu.enable(true);
  }

  ionViewDidLoad() {
    console.log("ionViewDidLoad");
  }

  ionViewWillEnter() {
  }

  ionViewDidEnter() {
  }

  ngOnInit() {
    
  }

}
