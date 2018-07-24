// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DataBaseProvider {

  constructor(private sqlite: SQLite) {
  }

  /**
   * Método responsável por criar um banco caso não exista ou pega um banco existente com o nome no parametro
   */
  public getDB() {
    return this.sqlite.create({
      name: 'myRoute.db',
      location: 'default'
    });
  }

  /**
   * Método responsável por criar a estrutura inicial do banco de dados
   */
  public createDatabase() {
    return this.getDB()
      .then((db: SQLiteObject) => {

        // Método que cria as tabelas
        this.createTables(db);

        // Método que insere um usuário admin ao banco de dados padrão
        this.insertUserDefault(db);

      })
      .catch(e => console.log(e));
  }

  /**
   * Criando as tabelas no banco de dados
   * @param db
   */
  private createTables(db: SQLiteObject) {
    // Criando as tabelas
    db.sqlBatch([
      ['CREATE TABLE IF NOT EXISTS users (id integer primary key AUTOINCREMENT NOT NULL, firstName TEXT, lastName TEXT, email TEXT, password TEXT)'],
      ['CREATE TABLE IF NOT EXISTS locations (id integer primary key AUTOINCREMENT NOT NULL, lat TEXT, lng TEXT, time TEXT, status integer, user_id integer, FOREIGN KEY(user_id) REFERENCES users(id))']
    ])
      .then(() => console.log('Tabelas criadas'))
      .catch(e => console.error('Erro ao criar as tabelas', e));
  }

  /**
   * Incluindo os dados padrões
   * @param db
   */
  private insertUserDefault(db: SQLiteObject) {
    db.executeSql('select COUNT(id) as qtd from users', [])
      .then((data: any) => {
        //Se não existe nenhum registro
        if (data.rows.item(0).qtd == 0) {
          // Inserindo os dados nas tabelas
          db.sqlBatch([
            ['INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)', ['Admin', 'Sistema', 'admin@myroute.com', '12345']]
          ])
            .then(() => console.log('Usuário admin inserido com sucesso.'))
            .catch(e => console.error('Erro ao incluir usuárioo', e));
        }
      })
      .catch(e => console.error('Erro ao consultar a qtd de categorias', e));
  }

}

