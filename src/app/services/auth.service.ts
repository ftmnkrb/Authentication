import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = "https://identitytoolkit.googleapis.com/v1/accounts"
  api_key = "AIzaSyDgMMKZb8ytXFFpE63srFF3gpAH0Zw3l4s"

  constructor(private http: HttpClient) { }

  signUp(email: string, password: string) {
    return this.http.post<any>(`${this.apiUrl}:signUp?key=${this.api_key}`, {
      email: email,
      password: password,
      returnSecureToken: true
    });
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(`${this.apiUrl}:signInWithPassword?key=${this.api_key}`, {
      email: email,
      password: password,
      returnSecureToken: true
    })
  }
 }
