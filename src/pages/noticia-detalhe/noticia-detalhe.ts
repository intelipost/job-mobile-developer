import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Component({
  selector: 'page-noticia-detalhe',
  templateUrl: 'noticia-detalhe.html'
})
export class NoticiaDetalhePage {

  private _url: string;

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public iab: InAppBrowser) {

    this._url = this.navParams.get('url');

  }

  cancelar(){
    this.viewCtrl.dismiss();
  }


  ionViewDidEnter(){
    this.abrirNoticia(this._url);
  }


  abrirNoticia(url){

    let browser = this.iab.create(url, '_blank');

    //Fecha a página após o usuário fechar a notícia
    browser.on('exit').subscribe((event) => {
      var timer = setInterval(() => {          
        clearInterval(timer);
        this.cancelar(); 
      }, 500);
    }, err => {
      console.error(err);
    });

  }


}
