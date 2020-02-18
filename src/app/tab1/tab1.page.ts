import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';
import { Broadcaster } from '@ionic-native/broadcaster/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isLogin:any;
  user:any;
  mitra:any;
  post:any;
  loading:any;
  parkir:any;
  constructor(private broadcaster: Broadcaster, private router: Router,public toastController: ToastController, public RestProvider: RestProvider,public alertController: AlertController) {
    this.isLogin = localStorage.getItem('token') ? true : false;
    if (this.isLogin) {
      this.user = JSON.parse(localStorage.getItem('user'));
    }
    this.getMitra();
    this.getPost();
    this.broadcaster.addEventListener('check').subscribe((event) =>{
      this.getUser();
    });

  }
  ionViewDidEnter(){
    this.getUser();
    this.getParkir();
    this.getMitra();
  }
  getUser(){
    this.isLogin = localStorage.getItem('token') ? true : false;
    this.loading = true;
    this.RestProvider.user().subscribe(
      (result:any) => {
        console.log(result)
        this.loading = false;
        localStorage.setItem('user',JSON.stringify(result.data));
        this.user = result.data;
    },
    (err) => {
      console.log(err)
      this.loading = false;
      this.presentToast('danger',err.error.message);
    })
  }
  getParkir(){
    this.loading = true;
    this.RestProvider.parkir().subscribe(
      (result:any) => {
        console.log(result)
        this.loading = false;
        this.parkir = result.data;
    },
    (err) => {
      console.log(err)
      this.loading = false;
      this.presentToast('danger',err.error.message);
    })
  }
  getMitra(){
    this.loading = true;
    this.RestProvider.mitra().subscribe(
      (result:any) => {
        console.log(result)
        this.loading = false;
        this.mitra = result.data;
    },
    (err) => {
      console.log(err)
      this.loading = false;
      this.presentToast('danger',err.error.message);
    })
  }
  getPost(){
    this.loading = true;
    this.RestProvider.post().subscribe(
      (result:any) => {
        console.log(result)
        this.loading = false;
        this.post = result.data;
    },
    (err) => {
      console.log(err)
      this.loading = false;
      this.presentToast('danger',err.error.message);
    })
  }
  gomitra(item){
  	this.router.navigate(['/mitra'],{queryParams:{data:JSON.stringify(item)}})
  }
  topup(){
     if (!this.isLogin) {
      this.router.navigate(['/login'])
    }else{
  	  this.router.navigate(['/topup'])
    }
  }
  history(){
    if (!this.isLogin) {
      this.router.navigate(['/login'])
    }else{
  	  this.router.navigate(['/topuphistory'])
    }
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
  out(item){
    this.router.navigate(['/receipt'],{queryParams:{data:JSON.stringify(item)}})
  }

  single(item){
    this.router.navigate(['/single'],{queryParams:{data:JSON.stringify(item)}})
  }
  pay(){
    if (this.parkir && this.parkir.length > 0) {
      this.router.navigate(['/receipt'],{queryParams:{data:JSON.stringify(this.parkir[0])}})
    }else{
      this.router.navigate(['/tabs/tab2'])
    }
  }
}
