import { Component } from '@angular/core';
import { AlertController,Events } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  isLogin:any;
  user:any;
  loading:any;
  data:any;
  halaman:any;
  history:any;
  hloading:any;
  constructor(public events: Events, private router: Router,public toastController: ToastController, public RestProvider: RestProvider,public alertController: AlertController) {
    this.getKendaraan();
    events.subscribe('user:created', (user, time) => {
      console.log('Welcome', user, 'at', time);
      this.data = null;
      this.getKendaraan();
    });
  }
  ionViewDidEnter(){    
    this.isLogin = localStorage.getItem('token') ? true : false;
    if (this.isLogin) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.getKendaraan();
    this.getHalaman();
    this.getHistory();
  }
  ionViewWillEnter(){    
    this.isLogin = localStorage.getItem('token') ? true : false;
    if (this.isLogin) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.getKendaraan();
    this.getHalaman();
    this.getHistory();
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
  getHistory(){
    this.hloading = true;
    this.RestProvider.history().subscribe(
      (result:any) => {
        console.log(result)
        this.hloading = false;
        this.history = result.data;
    },
    (err) => {
      console.log(err)
      this.hloading = false;
      this.presentToast('danger',err.error.message);
    })
  }
  getHalaman(){
    this.loading = true;
    this.RestProvider.halaman().subscribe(
      (result:any) => {
        console.log(result)
        this.loading = false;
        this.halaman = result.data;
    },
    (err) => {
      console.log(err)
      this.loading = false;
      this.presentToast('danger',err.error.message);
    })
  }
  add(){
  	this.router.navigate(['/tambahkendaraan'])
  }
  profile(){
  	this.router.navigate(['/register'],{queryParams:{edit:true}})
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
  riwayat(){
      this.router.navigate(['/history'])
  }
  logout(){
    localStorage.clear();
    this.router.navigate(['/login'])
  }
  single(item){
    this.router.navigate(['/single'],{queryParams:{data:JSON.stringify(item)}})
  }
  login(){
    this.router.navigate(['/login'])
  }
  out(item){
    this.router.navigate(['/receipt'],{queryParams:{data:JSON.stringify(item)}})
  }
  editKendaraan(item){
    this.router.navigate(['/tambahkendaraan'],{queryParams:{data:JSON.stringify(item)}})
  }
  async presentAlertConfirm(item) {
    const alert = await this.alertController.create({
      header: 'Konfirmasi',
      message: 'Apakah anda yakin ingin menghapus kendaraan <strong>'+ item.plat +'</strong>?',
      buttons: [
        {
          text: 'Tidak',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Ya',
          handler: () => {
            this.data = null;
            this.RestProvider.deleteKendaraan(item).subscribe(
              (result:any) => {
                console.log(result)
                this.getKendaraan();
            },
            (err) => {
              console.log(err)
              this.presentToast('danger',err.error.message);
              this.getKendaraan();
            })
          }
        }
      ]
    });

    await alert.present();
  }

}
