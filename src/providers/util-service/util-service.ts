import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';

@Injectable()
export class UtilServiceProvider {
  
  public loading;

  constructor(
    private toastCtrl: ToastController,
    public loadingCtrl: LoadingController
  ) {

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

  openLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
  
    this.loading.present();
  }

  closeLoading() {
    this.loading.dismiss();
  }
}
