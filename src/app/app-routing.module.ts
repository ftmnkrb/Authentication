import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  { path: 'homepage', component: HomepageComponent },
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
