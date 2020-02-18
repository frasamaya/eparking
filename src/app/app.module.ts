import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { Camera } from '@ionic-native/Camera/ngx';
import { File } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Push, PushObject, PushOptions } from '@ionic-native/push/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';

import { AppRoutingModule } from './app-routing.module';
import { LSelect2Module } from 'ngx-select2';
import { AppComponent } from './app.component';
import { HttpClientModule } from  '@angular/common/http';
import { RestProvider } from '../providers/rest/rest';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Broadcaster } from '@ionic-native/broadcaster/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import * as Sentry from "@sentry/browser";
import { ErrorHandler,Injectable } from '@angular/core';
Sentry.init({ dsn: 'https://c4d44454d6cb434db3721271f58fe4be@sentry.io/1880622' });

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() {}
  handleError(error) {
    const eventId = Sentry.captureException(error.originalError || error);
    //Sentry.showReportDialog({ eventId });
  }
}
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  	BrowserModule, 
  	IonicModule.forRoot(), 
  	AppRoutingModule,
	HttpClientModule,
	LSelect2Module
  ],
  providers: [
    StatusBar,
    RestProvider,
    SplashScreen,
    InAppBrowser,
    BarcodeScanner,
    Camera,
    File,
    FilePath,
    Push,
    FileTransfer,
    Broadcaster,
    Base64,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {provide: ErrorHandler, useClass: SentryErrorHandler}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

