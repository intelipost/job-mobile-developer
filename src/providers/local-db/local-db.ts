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
    console.log('Hello LocalDbProvider Provider');
  }

  //  Usando SQLite como solução para a parte de armazenamento local, primeiramente abre-se ou cria-se o banco 
  //  usando a função abaixo, então o objeto do bd é passado como argumento para criar as tabelas se as mesmas
  //  não existirem.

  openDb() {
    this.sqlite.create({
      name: "data.db",
      location: "default"
    })
    .then((db: SQLiteObject) => {
      this.createTables(db);
    })
  }

  // Cria duas tabelas (locations e locations_synced) se as duas não já existirem no banco. 
  // locations é a tabela com as localizações que ainda não foram passadas para o servidor,
  // locations_synced é a tabela com as localizações que já foram sincronizadas para o server.

  createTables(db) {
    db.executeSql("create table if not exists locations(id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, long TEXT, lat TEXT)", {})
      .then(res => console.log("created table"))
      .catch(err => console.log(err));
    db.executeSql("create table if not exists locations_synced(id INTEGER PRIMARY KEY AUTOINCREMENT, time TEXT, long TEXT, lat TEXT)", {})
      .then()
      .catch(err => console.log(err));
  }

}
