import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.page.html',
  styleUrls: ['./rating.page.scss'],
})
export class RatingPage implements OnInit {
	data:any;
	loading:any;
	rating:any = {rating:0,komentar:""}
	rateLoading:any;
  constructor( public toastController: ToastController,public RestProvider: RestProvider,private route: ActivatedRoute, private router: Router,public alertController: AlertController) { }

  ngOnInit() {
  	this.loading = true;
  	this.route.queryParams.subscribe(params => {
      if (params && params.id_parkir) {
         this.RestProvider.detailParkir(params.id_parkir).subscribe(
		      (result:any) => {
		        console.log(result)
		        //this.modal();
		        this.data = result.data
		        this.loading = false;
		    },
		    (err) => {
		      console.log(err)
		      this.loading = false;
		    })
      }
    });
  }
  submit(rate){
  	if (rate.rating == 0) {
  		this.presentToast('danger', "Anda belum melakukan rating");
  	}else if (rate.komentar.length < 5) {
  		this.presentToast('danger', "Komentar anda terlalu pendek");
  	}else{
  		this.rateLoading = true;
	  	let data = {rating:rate.rating,komentar:rate.komentar, parkir:this.data.id_parkir,mitra:this.data.mitra.id_mitra};
	    this.RestProvider.rating(data).subscribe(
	      (result:any) => {
	        console.log(result)
	        this.modal();
	        this.rateLoading = false;
	    },
	    (err) => {
	      console.log(err)
	      this.rateLoading = false;
	      this.presentToast('danger',err.error.message);
	    })
  	}
  }
  async modal(){
    const alert = await this.alertController.create({
      header: 'Terima kasih',
      message: 'Rating anda telah berhasil kami terima',
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
