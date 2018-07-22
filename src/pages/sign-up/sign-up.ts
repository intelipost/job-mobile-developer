import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html'
})
export class SignUpPage {
  public userAddForm: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    private formBuilder: FormBuilder
  ) {
    //disable menu
    this.menu.enable(false);
    this.userAddForm = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],
      passwordConfirmation: ['']
    });
  } 

  onSignIn() {
    
  }

  onForgotPassword() {

  }
  
}