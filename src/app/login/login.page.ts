import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signin:any = {phone:'',password:''}
  loading:any;
  constructor(private router: Router,public toastController: ToastController,public RestProvider: RestProvider,private route: ActivatedRoute) { }
  ngOnInit() {
  }
  register(){
  	 this.router.navigate(['/register'])
  }
  login(){
    this.loading = true;
    this.signin.fcm = localStorage.getItem('fcm');
    this.RestProvider.login(this.signin).subscribe(
      (result:any) => {
        console.log(result)
        this.loading = false;
        localStorage.setItem('token',result.token)
        localStorage.setItem('user',JSON.stringify(result.user))
        this.router.navigate(["/tabs/tab1"]);
    },
    (err) => {
      console.log(err)
      this.loading = false;
      this.presentToast('danger',err.error.invalid);
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
