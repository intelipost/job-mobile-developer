import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersProvider } from '../../providers/users/users';
import { Storage } from '@ionic/storage';
import { HomePage } from '../home/home';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  public credentialsForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    private formBuilder: FormBuilder,
    private userProvider: UsersProvider,
    private storage: Storage,
    private utilService: UtilServiceProvider
  ) {
    //disable menu
    this.menu.enable(false);
    this.credentialsForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignIn() {
    if (this.credentialsForm.valid) {
      this.userProvider.getUserByCredentials(this.credentialsForm.value).then(response => {
        if (response) {
          this.storage.set('isUserLogged', true).then(() => {
            this.storage.set('userLogged', response).then(() => {
              this.navCtrl.setRoot(HomePage);
            });
          });
        } else {
          this.utilService.presentToast('Usuário inválido.');
        }
      }).catch(e => {
        this.utilService.presentToast('Erro ao tentar fazer o login.');
        console.log("Erro ao realizar o login:" + e);
      })
    } else {
      this.utilService.presentToast('Preencha os campos corretamente.');
    }

  }

}