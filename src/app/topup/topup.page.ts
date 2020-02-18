import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-topup',
  templateUrl: './topup.page.html',
  styleUrls: ['./topup.page.scss'],
})
export class TopupPage implements OnInit {
  nominal:any;
  loading:any;
  user:any;
  constructor(private route: ActivatedRoute,private router: Router, public toastController: ToastController, public RestProvider: RestProvider,private navCtrl: NavController,public alertController: AlertController) { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
  submit(){
  	if (this.nominal < 20000) {
  		 this.presentToast('danger',"Nominal kurang dari Rp 20.000");
  	}else{
	  	this.loading = true;
	  	let data = {nominal:this.nominal};
	    this.RestProvider.topup(data).subscribe(
	      (result:any) => {
	        console.log(result)
	        this.loading = false;
	        this.navCtrl.navigateRoot("/end",{queryParams:{date:JSON.stringify(result)}});
	    },
	    (err) => {
	      console.log(err)
	      this.loading = false;
	      this.presentToast('danger',err.error.message);
	    })
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

}
