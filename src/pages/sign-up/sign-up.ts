import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UtilServiceProvider } from '../../providers/util-service/util-service';
import { UsersProvider } from '../../providers/users/users';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {
  public userAddForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public menu: MenuController,
    private formBuilder: FormBuilder,
    private utilService: UtilServiceProvider,
    private userProvider: UsersProvider,
    private storage: Storage
  ) {
    //disable menu
    this.menu.enable(false);
    this.userAddForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      passwordConfirmation: ['', Validators.required]
    });
  }

  addUser() {
    if (this.userAddForm.valid) {
      if (this.userAddForm.value['password'] === this.userAddForm.value['passwordConfirmation']) {
        this.userProvider.setUser(this.userAddForm.value).then(response => {
          if (response) {
            this.utilService.presentToast('Usuário criado com sucesso. Agora faça o login.');
            this.navCtrl.setRoot(LoginPage);
          } else {
            this.utilService.presentToast('Não foi possível salvar o usuário');
          }
        }).catch(e => {
          this.utilService.presentToast('Erro ao tentar salvar o usuário.');
          console.log("Erro ao realizar o login:" + e);
        })
      } else {
        this.utilService.presentToast('As senhas não são iguais.');
      }
    }else{
      this.utilService.presentToast('Preencha os campos corretamente.');
    }

  }


}