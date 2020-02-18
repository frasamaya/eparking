import { Component, OnInit,ViewChild } from '@angular/core';
import { AlertController, Events, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestProvider } from './../../providers/rest/rest';
import { ToastController } from '@ionic/angular';
import { IonRadioGroup } from '@ionic/angular';

@Component({
  selector: 'app-tambahkendaraan',
  templateUrl: './tambahkendaraan.page.html',
  styleUrls: ['./tambahkendaraan.page.scss'],
})
export class TambahkendaraanPage implements OnInit {
  merk:any;
  kendaraan:any = {jenis:"0",merk:''}; 
  model:any;
  year:any = [];
  loading:any;
  edit:any = false;
  @ViewChild('radioGroup', {static: true}) radioGroup: IonRadioGroup
  constructor(private platform: Platform, public events: Events, private route: ActivatedRoute, private router: Router, public toastController: ToastController, public RestProvider: RestProvider,public alertController: AlertController) { 
    this.platform.backButton.subscribe(() => {
      console.log('User created!')
      this.events.publish('user:created', "kendaraan", Date.now());
    });
  }
  ionViewWillLeave(){
    this.events.publish('user:created', "kendaraan", Date.now());
  }
  ngOnInit() {
  	this.kendaraan.jenis ="0";
  	this.radioGroup.value = "0"
  	let lastyear = new Date().getFullYear();
  	for (var i = 10; i >= 1; --i) {
  		let year = {id:lastyear-i,text:lastyear-i};
  		this.year.push(year)
  	}
  	this.year.push({id:new Date().getFullYear(),text:new Date().getFullYear()});
    this.kendaraan.tahun = this.year[0];
    this.route.queryParams.subscribe(params => {
      if (params && params.data) {
        this.kendaraan = JSON.parse(params.data);
        let jenis = ['Mobil','Motor','Sepeda','Lainnya'];
        this.kendaraan.jenis = jenis.indexOf(this.kendaraan.jenis).toString();
        this.getMerk(this.kendaraan.jenis);
        this.edit = true;
      }else{
        this.getMerk(this.kendaraan.jenis);
      }
    });
  }

  getMerk(id){
  	this.RestProvider.merk(id).subscribe(
      (result:any) => {
        console.log(result)
        this.merk = [];
        let self = this;
        if (result.data) {
          result.data.forEach(function(entry) {
             let item = {id:entry.id_merk,text:entry.nama};
             self.merk.push(item);
          });
          if (this.edit) {
           let kendaraan = result.data.find(o => o.nama === this.kendaraan.merk);
           console.log(kendaraan)
            if (kendaraan) {
              this.getModel(kendaraan.id_merk);
              this.kendaraan.merk = kendaraan.id_merk;
            }else{
              this.getModel(result.data[0].id_merk);
              this.kendaraan.merk = 0;
            }
            
          }else{
          	this.getModel(result.data[0].id_merk);
            this.kendaraan.merk = this.merk[0];
          }
  		  }
    },
    (err) => {
      console.log(err)
      this.presentToast('danger',err.error.message);
    })
  }
  getModel(id){
  	this.RestProvider.model(id).subscribe(
      (result:any) => {
        console.log(result)
        this.model = [];
        let self = this;
        if (result.data) {
      			result.data.forEach(function(entry) {
      			   let item = {id:entry.id_model,text:entry.nama};
      			   self.model.push(item);
      			});
            if (this.edit) {
              let kendaraan = result.data.find(o => o.nama === this.kendaraan.model);
              console.log(kendaraan);
              if (kendaraan) {
                this.kendaraan.model = kendaraan.id_model;
              }else{
                this.kendaraan.model = this.model[0];
              }
            }else{
              this.kendaraan.model = this.model[0];
            }
    		}
    },
    (err) => {
      console.log(err)
      this.presentToast('danger',err.error.message);
    })
  }
  merkChange(event){
  	console.log(event)
  	this.getModel(event.id)
  }
  milesKm(){
  	this.getMerk(this.kendaraan.jenis);
  }
  save(){
    console.log("Tambah")
    console.log(this.kendaraan)
  	this.kendaraan.merk = this.kendaraan.merk.id;
  	this.kendaraan.model = this.kendaraan.model.id;
    if (this.kendaraan.tahun) {
      this.kendaraan.tahun = this.kendaraan.tahun.id;
    }
  	
  	console.log(this.kendaraan);
    if (this.edit) {
      console.log(this.edit)
      this.loading = true;
      this.RestProvider.updateKendaraan(this.kendaraan).subscribe(
        (result:any) => {
          console.log(result)
          this.loading = false;
          this.presentToast('success',"Kendaraan berhasil diupdate");
      },
      (err) => {
        console.log(err)
        this.loading = false;
        this.presentToast('danger',err.error.message);
      })
    }else{
    	this.loading = true;
      this.RestProvider.postKendaraan(this.kendaraan).subscribe(
        (result:any) => {
          console.log(result)
          this.loading = false;
          this.route.queryParams.subscribe(params => {
            if (params && params.added) {
               this.router.navigate(["/tabs/tab2"]);
            }else{
                this.router.navigate(["/tabs/tab1"]);
            }
          });
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
