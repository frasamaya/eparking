import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-topuphistory',
  templateUrl: './topuphistory.page.html',
  styleUrls: ['./topuphistory.page.scss'],
})
export class TopuphistoryPage implements OnInit {
  data:any;
  loading:any;
 constructor(private router: Router,public toastController: ToastController, public RestProvider: RestProvider,public alertController: AlertController) { }

  ngOnInit() {
  }
  ionViewDidEnter(){
    this.getSaldo();
  }
  getSaldo(){
    this.loading = true;
    this.RestProvider.saldo().subscribe(
      (result:any) => {
        console.log(result)
        this.loading = false;
        this.data = result.data;
    },
    (err) => {
      console.log(err)
      this.loading = false;
      this.presentToast('danger',err.error.message);
    })
  }
  async presentToast(css,message) {
    const toast = await this.toastController.create({
      message: message,
      color: css,
      duration: 3000,
      showCloseButton: true
    });
    toast.present();
  }
}
