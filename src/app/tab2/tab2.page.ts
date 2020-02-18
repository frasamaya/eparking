import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
	isLogin:any;
  data:any;
  loading:any;
  constructor(private barcodeScanner: BarcodeScanner,private router: Router,public toastController: ToastController, public RestProvider: RestProvider,public alertController: AlertController) {
    this.getKendaraan();
  }
  ionViewDidEnter(){
    this.getKendaraan();
    this.isLogin = localStorage.getItem('token') ? true : false;
  }
  getKendaraan(){
    this.loading = true;
    this.RestProvider.kendaraan().subscribe(
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
  add(){
  	this.router.navigate(['/tambahkendaraan'],{queryParams:{added:true}})
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
  scan(item){
    this.barcodeScanner.scan().then(barcodeData => {
     console.log('Barcode data', barcodeData);
     let data = {token:barcodeData.text,kendaraan:item.id_kendaraan}
     this.router.navigate(['/scandone'],{queryParams:data})
    }).catch(err => {
        console.log('Error', err);
    });
  }
  login(){
    this.router.navigate(['/login'])
  }
}
