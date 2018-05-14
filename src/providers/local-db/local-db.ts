// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
/*
  Generated class for the LocalDbProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class LocalDbProvider {

  constructor(private sqlite: SQLite) {
  }

  //  Usando SQLite como solução para a parte de armazenamento local, primeiramente abre-se ou cria-se o banco 
  //  usando a função abaixo, então o objeto do bd é passado como argumento para criar a tabela se a mesma
  //  não existir.

  getDb() {
    return this.sqlite.create({
      name: "data.db",
      location: "default"
    })
  }

  // Cria tabela (locations) se ela não já existir no banco. 
  // locations é a tabela com as localizações que ainda não foram passadas para o servidor,

  createTables() {
    return this.getDb()
      .then((db: SQLiteObject) => { 
      db.executeSql("create table if not exists locations(id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, lng TEXT, lat TEXT)", {})
        .catch(err => console.log('Erro na criação da tabela locations:', err));
    })
  }

}
