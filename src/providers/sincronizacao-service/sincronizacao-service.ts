import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const endereco: string = 'https://webhook.site/6023011b-3a36-4ffe-88bc-d80e1bfe861a';

const proxyurl = "https://cors-anywhere.herokuapp.com/";


@Injectable()
export class SincronizacaoServiceProvider {

  constructor(private _http: HttpClient) {
    
  }

  enviarDados(resposta){

    return this._http.post(proxyurl + endereco, JSON.stringify(resposta));
  }



}
