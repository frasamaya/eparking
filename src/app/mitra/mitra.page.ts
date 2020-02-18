import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-mitra',
  templateUrl: './mitra.page.html',
  styleUrls: ['./mitra.page.scss'],
})
export class MitraPage implements OnInit {
  data:any;
  constructor(private iab: InAppBrowser, public toastController: ToastController,public RestProvider: RestProvider,private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  	this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.data = JSON.parse(params.data)
      }
    });
  }
  direction(){
  	let url = 'https://www.google.com/maps?saddr=My+Location&daddr='+this.data.lat+','+this.data.lng;
  	this.iab.create(url, '_system');
  }
}
