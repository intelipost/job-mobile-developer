import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class UtilServiceProvider {

  constructor(private toastCtrl: ToastController) {

  }

  presentToast(messageTxt?) {
    let toast = this.toastCtrl.create({
      message: messageTxt,
      duration: 3000,
      position: 'top'
    });
  
    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });
  
    toast.present();
  }
}
