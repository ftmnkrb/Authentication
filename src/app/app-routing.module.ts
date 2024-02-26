import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuard } from './guards/auth.guards';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent, canActivate: [AuthGuard] }, //canActivate false döndüğü için homapage e gitmeyi engeller. aslında canActivate eklediklerimizi korumuş oluyoruz.
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
