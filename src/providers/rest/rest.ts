import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {
  baseUrl:string = "https://parkir.faqihamruddin.com/api/";
  constructor(public http: HttpClient) {
    console.log('Hello RestProvider Provider');
  }
  getBaseUrl(){
    return this.baseUrl;
  }
  merk(id) {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.baseUrl + 'merk/index/'+id,{ headers: headers });
  }
  mitra() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.baseUrl + 'mitra',{ headers: headers });
  }
  halaman() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.baseUrl + 'halaman',{ headers: headers });
  }
  post() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.baseUrl + 'post',{ headers: headers });
  }
  model(id) {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get(this.baseUrl + 'model/index/'+id,{ headers: headers });
  }
  kendaraan() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')});
    return this.http.get(this.baseUrl + 'kendaraan',{ headers: headers });
  }
  user() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')});
    return this.http.get(this.baseUrl + 'user/detail',{ headers: headers });
  }
  saldo() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')});
    return this.http.get(this.baseUrl + 'saldo',{ headers: headers });
  }
  parkir() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')});
    return this.http.get(this.baseUrl + 'parkir',{ headers: headers });
  }
  history() {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')});
    return this.http.get(this.baseUrl + 'parkir/history',{ headers: headers });
  }
  detailParkir(id) {
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')});
    return this.http.get(this.baseUrl + 'parkir/index/'+id,{ headers: headers });
  }
  //POST
  login(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl + 'user/login', JSON.stringify(data),{ headers: headers });
  }
  register(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl + 'user', JSON.stringify(data),{ headers: headers });
  }
  updateProfile(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')   });
    return this.http.post(this.baseUrl + 'user/edit', JSON.stringify(data),{ headers: headers });
  }
  updateKendaraan(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')   });
    return this.http.post(this.baseUrl + 'kendaraan/edit', JSON.stringify(data),{ headers: headers });
  }
  verify(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.baseUrl + 'user/verify', JSON.stringify(data),{ headers: headers });
  }
  postKendaraan(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')  });
    return this.http.post(this.baseUrl + 'kendaraan', JSON.stringify(data),{ headers: headers });
  }

  deleteKendaraan(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')  });
    return this.http.post(this.baseUrl + 'kendaraan/delete', JSON.stringify(data),{ headers: headers });
  }
  topup(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')  });
    return this.http.post(this.baseUrl + 'topup', JSON.stringify(data),{ headers: headers });
  }
  scan(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')  });
    return this.http.post(this.baseUrl + 'parkir', JSON.stringify(data),{ headers: headers });
  }
  pay(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')  });
    return this.http.post(this.baseUrl + 'parkir/pay', JSON.stringify(data),{ headers: headers });
  }
  rating(data) {
    console.log(JSON.stringify(data))
    var headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization':localStorage.getItem('token')  });
    return this.http.post(this.baseUrl + 'parkir/rating', JSON.stringify(data),{ headers: headers });
  }
  
}
