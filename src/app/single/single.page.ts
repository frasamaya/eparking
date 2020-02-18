import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController,AlertController } from '@ionic/angular';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-single',
  templateUrl: './single.page.html',
  styleUrls: ['./single.page.scss'],
})
export class SinglePage implements OnInit {
  data:any;
  constructor(private iab: InAppBrowser, public toastController: ToastController,public RestProvider: RestProvider,private route: ActivatedRoute, private router: Router,public alertController: AlertController) { }
  
  ngOnInit() {
  	this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.data = JSON.parse(params.data)
        console.log(this.data)
      }
    });
  }

}
