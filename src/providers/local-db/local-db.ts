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
  //  usando a função abaixo, então o objeto do bd é passado como argumento para criar as tabelas se as mesmas
  //  não existirem.

  getDb() {
    return this.sqlite.create({
      name: "data.db",
      location: "default"
    })
  }

  // Cria duas tabelas (locations e locations_synced) se as duas não já existirem no banco. 
  // locations é a tabela com as localizações que ainda não foram passadas para o servidor,
  // locations_synced é a tabela com as localizações que já foram sincronizadas para o server.

  createTables() {
    return this.getDb()
      .then((db: SQLiteObject) => { 
      db.executeSql("create table if not exists locations(id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, lng TEXT, lat TEXT)", {})
        .catch(err => console.log('Erro na criação da tabela locations:', err));
        db.executeSql("create table if not exists locations_synced(id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, lng TEXT, lat TEXT)", {})
        .catch(err => console.log('Erro na criação da tabela locations_synced:', err));
    })
  }

}
