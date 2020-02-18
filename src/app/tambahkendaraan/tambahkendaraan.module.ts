import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { LSelect2Module } from 'ngx-select2';

import { IonicModule } from '@ionic/angular';

import { TambahkendaraanPage } from './tambahkendaraan.page';

const routes: Routes = [
  {
    path: '',
    component: TambahkendaraanPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LSelect2Module,
    RouterModule.forChild(routes)
  ],
  declarations: [TambahkendaraanPage]
})
export class TambahkendaraanPageModule {}
