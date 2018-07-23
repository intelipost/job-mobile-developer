import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
    selector: 'page-news',
    templateUrl: 'news.html',
})
export class NewsPage {
    private news: any;

    constructor(public navCtrl: NavController, public navParams: NavParams, private http: HttpClient) {
        this.http.get('https://jsonplaceholder.typicode.com/albums/1/photos').subscribe(res => {
            console.log(res);
            this.news = res;
        }, err => {
            console.error('Falha ao consultar as notícias', err);
        })
    }
}
