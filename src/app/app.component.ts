import { Component } from '@angular/core';
import { Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { GeolocalizacaoServiceProvider } from '../providers/geolocalizacao-service/geolocalizacao-service';
import { Storage } from '@ionic/storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _geolocalizacaoServiceProvider: GeolocalizacaoServiceProvider,
    private _storage: Storage,
    public events: Events) {
    
    
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      //Verifica a localização a cada 3 minutos
      setInterval(() => {
        this.verificarLocalizacao();
      },180000);


    });
  }
  

  ngAfterViewInit(){
    //Verifica a localização assim que abre o aplicativo
    this.platform.ready().then(() => {
      this.verificarLocalizacao();
    });
  }


  verificarLocalizacao(){

    //Busca a geolocalização
    this._geolocalizacaoServiceProvider.getPosicaoAtual().then((pos) => {

      //Armazena a nova posição no storage
      this._storage.ready().then (() => {
        this._storage.get('posicao').then((posicao) => {
          if (posicao){
            posicao.push({latitude:pos[0], longitude:pos[1], timestamp:new Date().getTime()});
          }
          else posicao = [{latitude:pos[0], longitude:pos[1], timestamp:new Date().getTime()}];
          this._storage.set('posicao', posicao);
  
          //Atualiza a lista de posições na página Localização
          this.events.publish('atualizaLista');
        });
  
        })
        .catch((err) => {
          this.armazenarErro();
          
        });
      })
      .catch(() => {
        this.armazenarErro();
      })
      
  }

  armazenarErro(){
    //Armazena como 'Erro'
    let pos1 = {latitude:'Erro', longitude:'Erro', timestamp:new Date().getTime()}
        
    //Armazena a nova posição no storage
    this._storage.get('posicao').then((posicao) => {
      if (posicao){
        posicao.push({latitude:pos1.latitude, longitude:pos1.longitude, timestamp:pos1.timestamp});
      }
      else posicao = [{latitude:pos1.latitude, longitude:pos1.longitude, timestamp:pos1.timestamp}];
      this._storage.set('posicao', posicao);

      //Atualiza a lista de posições na página Localização
      this.events.publish('atualizaLista');

    });
  }


}
