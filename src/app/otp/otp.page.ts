import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';
@Component({
  selector: 'app-otp',
  templateUrl: './otp.page.html',
  styleUrls: ['./otp.page.scss'],
})
export class OtpPage implements OnInit {
  phone:any;
  loading:any;
  otp:any;
  constructor(public toastController: ToastController,public RestProvider: RestProvider,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	this.route.queryParams.subscribe(params => {
      if (params && params.phone) {
        this.phone = params.phone;
      }
    });
  }

  verify(otp){
  	this.loading = true;
  	let data = {
  		phone:this.phone,
  		otp:otp
  	}
    this.RestProvider.verify(data).subscribe(
      (result:any) => {
        console.log(result)
        this.loading = false;
        localStorage.setItem('token',result.token)
        localStorage.setItem('user',JSON.stringify(result.user))
        this.router.navigate(["/tambahkendaraan"]);
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
