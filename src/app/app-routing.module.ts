import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  { path: 'mitra', loadChildren: './mitra/mitra.module#MitraPageModule' },
  { path: 'topup', loadChildren: './topup/topup.module#TopupPageModule' },
  { path: 'topuphistory', loadChildren: './topuphistory/topuphistory.module#TopuphistoryPageModule' },
  { path: 'tambahkendaraan', loadChildren: './tambahkendaraan/tambahkendaraan.module#TambahkendaraanPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'otp', loadChildren: './otp/otp.module#OtpPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'end', loadChildren: './end/end.module#EndPageModule' },
  { path: 'scandone', loadChildren: './scandone/scandone.module#ScandonePageModule' },
  { path: 'receipt', loadChildren: './receipt/receipt.module#ReceiptPageModule' },
  { path: 'intro', loadChildren: './intro/intro.module#IntroPageModule' },
  { path: 'rating', loadChildren: './rating/rating.module#RatingPageModule' },
  { path: 'single', loadChildren: './single/single.module#SinglePageModule' },
  { path: 'history', loadChildren: './history/history.module#HistoryPageModule' }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
