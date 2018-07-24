import { Component } from '@angular/core';
import { NavController, AlertController, Events, LoadingController } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import { Camera } from '@ionic-native/camera';
import { SincronizacaoServiceProvider } from '../../providers/sincronizacao-service/sincronizacao-service';
import { HttpErrorResponse } from '../../../node_modules/@angular/common/http';


@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html'
})
export class LocalizacaoPage {

  private _posicoes;

  constructor(public navCtrl: NavController,
    private _storage: Storage,
    private _camera: Camera,
    public alertCtrl: AlertController,
    public events: Events,
    private _sincronizacaoService: SincronizacaoServiceProvider,
    public loadingCtrl: LoadingController) {

    events.subscribe('atualizaLista', () => {
      this.atualizaLista();
    });

  }


  ionViewDidEnter(){
    //Atualiza a lista quando entra na página
    this.atualizaLista();
  }

  atualizaLista(){
    //Busca posições armazenadas no storage e armazena na variável this._posicoes
    this._storage.ready().then(() => {
      this._storage.get('posicao').then((posicao) => {
        this._posicoes = posicao;
      });
    })
    
  }
  

  enviarLocalizacoes(){

    //Pergunta ao usuário antes de tirar a foto
    let alert = this.alertCtrl.create({
      title: 'Informação',
      subTitle: 'Será tirada uma selfie para envio com a lista de posições rastreadas',
      buttons: [
        {
          text: 'OK',
          handler: () => {

            //Se o usuário clicar em OK, a câmera será aberta para que ele tire uma selfie
            this._camera.getPicture({destinationType: 0, cameraDirection: 1})
            .then((imageData) => {

              //Dados que serão enviados
              var resposta = {
                status: 'ok',
                localizacoes: this._posicoes,
                foto: 'data:image/jpeg;base64,' + imageData
              };

              let loader = this.loadingCtrl.create({
                content: "Enviando dados...",
              });
              loader.present();


              this._sincronizacaoService.enviarDados(resposta)
              .subscribe(
                (val) => {

                  loader.dismiss();
                  let alert1 = this.alertCtrl.create({
                    title: 'Confirmação',
                    subTitle: 'Os dados foram enviados com sucesso',
                    buttons: ['OK']
                  });
                  alert1.present();

                  //Apaga a lista de localizações
                  this.apagarLocalizacoes();
                  
                },
                (err: HttpErrorResponse) => {
                  loader.dismiss();
                  let alert2 = this.alertCtrl.create({
                    title: 'Erro',
                    subTitle: 'Não foi possível enviar os dados. Tente novamente mais tarde. ',
                    buttons: ['OK']
                  });
                  alert2.present();
                }
              );

        
             }, (err) => {

              let alert = this.alertCtrl.create({
                title: 'Informação',
                subTitle: 'Não foi possível tirar a foto. Tente novamente.',
                buttons: ['OK']
              });
              alert.present();
        
             });
          }
        },
        {
          text: 'Cancelar',
          //Se o usuário clicar em Cancelar, não será feita nennhuma ação
          handler: () => {}
        }
      ]
    });
    alert.present();
    

  }


  apagarLocalizacoes(){
    //Função criada para apagar as localizações após o envio
    
    this._storage.ready().then(() => {
      this._storage.remove('posicao').then(() => {
        this._posicoes = null;
      })
    })
    

  }
  

}
