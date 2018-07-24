import { Component, ViewChild } from '@angular/core';
import { NavController, Content, LoadingController, ModalController, Platform } from 'ionic-angular';
import { NoticiasServiceProvider } from '../../providers/noticias-service/noticias-service';
import { Noticias } from '../../domain/noticias/noticias';
import { Artigos } from '../../domain/noticias/artigos';
import { NoticiaDetalhePage } from '../noticia-detalhe/noticia-detalhe';

@Component({
  selector: 'page-noticias',
  templateUrl: 'noticias.html'
})
export class NoticiasPage {

  @ViewChild(Content) content: Content;

  private _noticias: Artigos;

  constructor(public navCtrl: NavController,
    private _noticiasServiceProvider: NoticiasServiceProvider,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public platform: Platform) {

  }


  ionViewDidEnter(){

    //Atualiza a lista de notícias quando o usuário entra na página
    this.platform.ready().then(() => {
      this.atualizarNoticias();
    })
    

  }


  atualizarNoticias(){

    let loader = this.loadingCtrl.create({
      content: "Atualizando notícias...",
    });
    loader.present();

    this._noticiasServiceProvider.buscarNoticias().then((noticias: Noticias) => {

      this._noticias = noticias.articles;

      this.content.resize();
      this.content.scrollToTop();
      loader.dismiss();

    })
    .catch((error) => {
      loader.dismiss();
    });
  }


  abrirNoticia(url){
    //Abre a notícia selecionada em uma nova página
    let modal = this.modalCtrl.create(NoticiaDetalhePage, {url: url});
    modal.present();
  }


}
