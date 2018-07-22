import { Injectable } from '@angular/core';
import { DataBaseProvider } from '../data-base/data-base';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class UsersProvider {

  private users: Array<any> = [];
  private user: Array<any> = [];

  constructor(
    public dataBaseProvider: DataBaseProvider
  ) {}

  setUser(obj) {
    return this.dataBaseProvider.getDB()
      .then((db: SQLiteObject) => {
        let query = "'INSERT INTO user(firstName, lastName, email, password) VALUES (?, ?, ?, ?)'";
        let data = [obj.firstName, obj.lastName, obj.email, obj.password];

        return db.executeSql(query, data)
          .catch(err => console.log('Error ao inserir o usuário:', err)
        )
      }
    )
  }

  getUserByID(userID) {
    return this.dataBaseProvider.getDB()
      .then((db: SQLiteObject) => {
        let query = 'SELECT * FROM users WHERE id = ' + userID;
        let data = [];
        return db.executeSql(query, data)
          .then(data => {
            if(data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                this.user.push(data.rows.item(i));
              }
              return this.user;
            }
          })
          .catch(err => console.log('Erro na hora de pegar localizações:', err)
        )
      }
    )
  }

  getUserByCredentials(obj) {
    return this.dataBaseProvider.getDB()
      .then((db: SQLiteObject) => {
        let query = 'SELECT * FROM users WHERE email = ? AND password = ?';
        let data = [obj.email, obj.password];
        return db.executeSql(query, data)
          .then(data => {
            if(data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                this.user.push(data.rows.item(i));
              }
              return this.user;
            }
          })
          .catch(err => console.log('Erro ao pegar os dados do usuário:', err)
        )
      }
    )
  }

  getAllUsers() {
    return this.dataBaseProvider.getDB()
      .then((db: SQLiteObject) => {
        let query = 'SELECT * FROM users ORDER BY id DESC';
        let data = [];
        return db.executeSql(query, data)
          .then(data => {
            if(data.rows.length > 0) {
              for (let i = 0; i < data.rows.length; i++) {
                this.users.push(data.rows.item(i));
              }
              return this.users;
            }
          })
          .catch(err => console.log('Erro na hora de pegar localizações:', err)
        )
      }
    )
  }
}
