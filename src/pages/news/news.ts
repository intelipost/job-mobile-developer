import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewsProvider } from '../../providers/news/news';

@IonicPage()
@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  public news;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public newsProvider: NewsProvider
  ) {
    
  }

  ionViewWillEnter() {
    this.getNews();
  }

  ionViewDidEnter() {
    this.getNews();
  }

  getNews() {
    this.newsProvider.getNews().subscribe(response => {
      this.news = response.articles;
    });
  }


}
