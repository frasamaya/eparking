import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController,AlertController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.page.html',
  styleUrls: ['./receipt.page.scss'],
})
export class ReceiptPage implements OnInit {
  data:any;
  keluar:any = new Date();
  loading:any;
  constructor(private iab: InAppBrowser, public toastController: ToastController,public RestProvider: RestProvider,private route: ActivatedRoute, private router: Router,public alertController: AlertController) { }

  ngOnInit() {
  	this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.data = JSON.parse(params.data)
        console.log(this.data)
      }
    });
  }
  pay(){
  	this.loading = true;
  	let data = {id_parkir:this.data.id_parkir};
    this.RestProvider.pay(data).subscribe(
      (result:any) => {
        console.log(result)
        //this.modal();
        this.router.navigate(['/rating'],{queryParams:{id_parkir:this.data.id_parkir}})
        this.loading = false;
    },
    (err) => {
      console.log(err)
      this.loading = false;
      this.presentToast('danger',err.error.message);
    })
  }
  async modal(){
    const alert = await this.alertController.create({
      header: 'Pembayaran berhasil',
      message: 'Pembayaran anda telah berhasil kami terima',
      buttons: [{
          text: 'Mengerti',
          handler: () => {
           this.router.navigate(['/tabs/tab1'])
          }
        }
      ]
    });

    await alert.present();
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
