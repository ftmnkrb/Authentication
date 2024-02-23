import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';
import { Subject, tap } from 'rxjs';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://identitytoolkit.googleapis.com/v1/accounts"
  api_key = "AIzaSyDgMMKZb8ytXFFpE63srFF3gpAH0Zw3l4s"

  user = new Subject<User>

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}:signUp?key=${this.api_key}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      tap(response =>{
        const expirationDate = new Date(new Date().getTime() + (+response.expireIn * 1000))
        const user = new User(
          response.email,
          response.localId,
          response.idToken,
          expirationDate);

          this.user.next(user)
      })
    )
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}:signInWithPassword?key=${this.api_key}`, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
 }
