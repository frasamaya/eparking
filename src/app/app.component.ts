import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from "@angular/router";
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { Broadcaster } from '@ionic-native/broadcaster/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private broadcaster: Broadcaster,
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private push: Push
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (localStorage.getItem('token')) {
         this.router.navigateByUrl('/tabs/tab1');
      }else{
        this.router.navigateByUrl('/intro');
      }
      const options: PushOptions = {
         android: {},
         ios: {
             alert: 'true',
             badge: true,
             sound: 'false'
         },
         windows: {},
         browser: {
             pushServiceURL: 'http://push.api.phonegap.com/v1/push'
         }
      }

      const pushObject: PushObject = this.push.init(options);


      pushObject.on('notification').subscribe((notification: any) => {
        console.log('Received a notification', notification)
        this.broadcaster.fireNativeEvent('check', {}).then(() => console.log('success'));
      });

      pushObject.on('registration').subscribe((registration: any) => {
        console.log('Device registered', registration);
         localStorage.setItem('fcm',registration.registrationId);
      });

      pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
