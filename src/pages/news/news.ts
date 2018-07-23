import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
    selector: 'page-news',
    templateUrl: 'news.html',
})
export class NewsPage {
    private news: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient, private loadingCtrl: LoadingController) {
        let loading = this.loadingCtrl.create({
            showBackdrop: true,
            content: 'Aguarde...'
        });
        loading.present();

        this.http.get('https://jsonplaceholder.typicode.com/albums/1/photos').subscribe(res => {
            loading.dismiss();
            this.news = res;
        }, err => {
            loading.dismiss();
            console.error('Falha ao consultar as notícias', err);
        })
    }
}
