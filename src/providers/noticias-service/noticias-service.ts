import { Injectable } from '@angular/core';

//Notícias do News API: https://newsapi.org/s/google-news-api

const url: string = 'https://newsapi.org/v2/top-headlines?' +
                    'country=br&' +
                    'apiKey=2bcd7452a29348f99c79c45da640b247';


@Injectable()
export class NoticiasServiceProvider {
  

  constructor() {
    
  }

  buscarNoticias(){

    return new Promise ((resolve, reject) => {

      var req = new Request(url);

      fetch(req).then(function(response){
        resolve(response.json());
      })
      .catch((error) => {
        reject(error);
      });
    
    });

  }

}
