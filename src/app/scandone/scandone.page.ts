import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';
import { NavController } from "@ionic/angular";

@Component({
  selector: 'app-scandone',
  templateUrl: './scandone.page.html',
  styleUrls: ['./scandone.page.scss'],
})
export class ScandonePage implements OnInit {
  data:any;
  loading:any = false;
  done:any = false;
  constructor(private route: ActivatedRoute,private router: Router, public toastController: ToastController, public RestProvider: RestProvider,private navCtrl: NavController,public alertController: AlertController) { }

  ngOnInit() {
  	this.route.queryParams.subscribe(params => {
      if (params && params.token) {
       let data = {token:params.token,kendaraan:params.kendaraan}
       this.loading = true;
	    this.RestProvider.scan(data).subscribe(
	      (result:any) => {
	        console.log(result)
	        this.loading = false;
	        this.done = true;
	    },
	    (err) => {
	      console.log(err)
	      this.loading = false;
        this.router.navigate(['/tabs/tab2'])
	      this.presentToast('danger',err.error.message);
	    })
      }
    });
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
  home(){
  	this.router.navigate(['/tabs/tab1'])
  }
}
