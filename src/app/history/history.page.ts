import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {
  loading:any;
  history:any;
  constructor(private router: Router,public toastController: ToastController, public RestProvider: RestProvider,public alertController: AlertController) { }

  ngOnInit() {
  	this.getHistory();
  }
  getHistory(){
    this.loading = true;
    this.RestProvider.history().subscribe(
      (result:any) => {
        console.log(result)
        this.loading = false;
        this.history = result.data;
    },
    (err) => {
      console.log(err)
      this.loading = false;
      this.presentToast('danger',err.error.message);
    })
  }
  out(item){
    this.router.navigate(['/receipt'],{queryParams:{data:JSON.stringify(item)}})
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
