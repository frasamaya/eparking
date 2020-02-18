import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';


@Component({
  selector: 'app-end',
  templateUrl: './end.page.html',
  styleUrls: ['./end.page.scss'],
})
export class EndPage implements OnInit {
  data:any;
  constructor(private iab: InAppBrowser, public toastController: ToastController,public RestProvider: RestProvider,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	this.route.queryParams.subscribe(params => {
      if (params && params.date) {
        this.data = JSON.parse(params.date)
        console.log(this.data)
      }
    });
  }
	 home(){
	 	this.router.navigate(['/tabs/tab1'])
	 }
}
