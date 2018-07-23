import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';
import { Observable } from 'rxjs/Observable';

declare let window: any;

@Injectable()
export class DatabaseProvider {
    private database: any;

    constructor(private platform: Platform, private sqlite: SQLite) {
        this.createDatabase();
    }

    createDatabase() {
        if (this.platform.is('cordova')) {
            this.sqlite.create({ name: 'local_database.db', location: 'default' }).then(database => { 
                this.database = database;
                this.createTable();
            }).catch(err => {
                console.error('Erro na criação do banco de dados');
            });
        } else {
            this.database = window.openDatabase('local_database.db', '1.0', 'Data Locations', -1);
            this.createTable();
        }        
    }

    createTable() {
        this.executeSql('CREATE TABLE IF NOT EXISTS locations(id INTEGER PRIMARY KEY AUTOINCREMENT, date DATE, latitude TEXT, longitude TEXT, sync BOOL)').subscribe(res => {
            console.log('tabela criada');
        }, err => {
            console.error('erro ao criar a tabela locations', err);
        })
    }

    executeSql(sql, values: any = null) {
        if (this.platform.is('cordova')) {
            if (!values) {
                values = []
            }

            return Observable.create(observer => {
                this.database.executeSql(sql, values).then(res => {
                    observer.next(res);
                    observer.complete();
                }).catch(err => {       
                    observer.error(err);
                })
            })
        } else {
            if (!values) {
                values = [];
            }

            return Observable.create(observer => {
                this.database.transaction(tx => {
                    tx.executeSql(sql, values, (tx, res) => {
                        observer.next(res);
                        observer.complete();
                    }, (tx, err) => {
                        observer.error(err);
                    });
                })
            })
        }
    }
}
