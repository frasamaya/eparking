import { Component, OnInit } from '@angular/core';
import { AlertController,Platform,ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';
import { NavController } from "@ionic/angular";
import { DomSanitizer } from '@angular/platform-browser';

import { File, FileEntry } from '@ionic-native/File/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/Camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject  } from '@ionic-native/file-transfer/ngx';
import { Base64 } from '@ionic-native/base64/ngx';

declare var cordova: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  user:any = {nama:'',phone:'',email:'',password:'',repassword:'',avatarp:''};
  loading:any;
  isLogin:any;
  constructor(
    private sanitizer:DomSanitizer,
    //private base64: Base64,
    public actionsheetCtrl: ActionSheetController,
    private camera: Camera, 
    private file: File, 
    private filePath: FilePath,
    public platform: Platform,
    private transfer: FileTransfer,
    private route: ActivatedRoute,
    private router: Router, 
    public toastController: ToastController, 
    public RestProvider: RestProvider,
    private navCtrl: NavController,
    public alertController: AlertController) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.edit) {
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user)
      }
    });
  }
  presentAlertConfirm() {
     this.route.queryParams.subscribe(params => {
      if (params && params.edit) {
        this.loading = true;
        this.RestProvider.updateProfile(this.user).subscribe(
          (result:any) => {
            console.log(result)
            this.loading = false;
            this.getUser();
          this.presentToast('success',"Update profile berhasil");
        },
        (err) => {
          console.log(err)
          this.loading = false;
          this.presentToast('danger',err.error.message);
        })
      }else{
        this.modal();
      }
    });
    
  }

  async modal(){
    const alert = await this.alertController.create({
      header: 'Konfirmasi Nomor Telepon',
      message: 'Pastikan nomor telepon anda sudah benar, kami akan mengirimkan kode verifikasi nomor anda',
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Mengerti',
          handler: () => {
            this.register()
          }
        }
      ]
    });

    await alert.present();
  }
  getUser(){
    this.isLogin = localStorage.getItem('token') ? true : false;
    this.loading = true;
    this.RestProvider.user().subscribe(
      (result:any) => {
        console.log(result)
        this.loading = false;
        localStorage.setItem('user',JSON.stringify(result.data));
        this.user = result.data;
    },
    (err) => {
      console.log(err)
      this.loading = false;
      this.presentToast('danger',err.error.message);
    })
  }
  register(){
    // if (!this.user.avatarp) {
    //   this.presentToast('danger',"Foto profil belum dipilih");
    // }else{
    	this.loading = true;
      this.user.fcm = localStorage.getItem('fcm');
      this.RestProvider.register(this.user).subscribe(
        (result:any) => {
          console.log(result)
          this.loading = false;
          this.navCtrl.navigateRoot("/otp",{queryParams:{phone:result.sms.messages[0].to}});
      },
      (err) => {
        console.log(err)
        this.loading = false;
        this.presentToast('danger',err.error.message);
      })
    //}
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

  async presentActionSheet(field) {
    const actionSheet = await this.actionsheetCtrl.create({
      header: 'Option',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Take photo',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'ios-camera-outline' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA,field);
          }
        },
        {
          text: 'Choose photo from Gallery',
          icon: !this.platform.is('ios') ? 'ios-images-outline' : null,
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY,field);
          }
        },
      ]
    });
    await actionSheet.present();
       
  }
  public takePicture(sourceType,field) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };
    // Get the data of an image
    this.camera.getPicture(options).then((imageData) => {
      // Special handling for Android library
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.user.avatarp = base64Image
      // if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
      //   this.filePath.resolveNativePath(imagePath)
      //     .then(filePath => {
      //       let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
      //       let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
      //       this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),field);
      //     });
      // } else {
      //   var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      //   var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      //   this.copyFileToLocalDir(correctPath, currentName, this.createFileName(),field);
      // }
    }, (err) => {
      console.log(err);
      //this.presentToast('Error while selecting image.');
    });
  }
  private copyFileToLocalDir(namePath, currentName, newFileName,field) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      console.log(cordova.file.dataDirectory + newFileName);
      this.user.avatarp = cordova.file.dataDirectory + newFileName;
      //this.loading = false;
    }, error => {
      this.presentToast('danger',"Error uploading");
      //this.loading = false;
    });
  }
  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  private createFileName() {
    var d = new Date(),
    n = d.getTime(),
    newFileName =  n + ".jpg";
    return newFileName;
  }
}
