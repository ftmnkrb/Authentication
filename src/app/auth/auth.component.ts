import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  isLoginMode: boolean = false;
  loading: boolean = false

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}


  onToggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){
    if(form.invalid){
      return;
    }

      const email = form.value.email;
      const password = form.value.password;
      console.log(email);
      console.log(password);

      this.loading = true;

      let authResponse: Observable<AuthResponse>;

    if(this.isLoginMode) {
      authResponse = this.authService.login(email, password)
    } else {
      authResponse = this.authService.signUp(email, password)
    }

    authResponse.subscribe(response => {
      console.log(response);
      // alert("KAYIT BAŞARILI :)")
      this.loading = false;

      // this.loading = false;
    }, err => {
      console.log(err);
      alert(err.error.error.message)
      this.loading = false;

      // this.loading = false;
    })

    form.reset();

  



}}
