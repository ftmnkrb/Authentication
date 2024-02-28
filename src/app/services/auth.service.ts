import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/AuthResponse';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://kadinhepp-7229fba7916e.herokuapp.com/';
  api_key = 'e1eee689-a4f8-4cd3-8521-e88982b2d6af';  

  // user = new Subject<User | null>();
  user = new BehaviorSubject<User | null>(null);



  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string, name: string, location: string) {
    console.warn('signUp');
    return this.http
      .post<any>(`${this.apiUrl}user/register`, {
        name: name,
        email: email,
        password: password,
        location: location
        // returnSecureToken: true,
      })
      .pipe(
        tap((response) => {
          this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)}
          )
      );
  }

  login(email: string, password: string) {
    console.warn('signIn');
    return this.http
      .post<AuthResponse>(
        `${this.apiUrl}`,
        {
          email: email,
          password: password
          // returnSecureToken: true,
        }
      )
      .pipe(
        tap((response) => {
          this.handleAuthentication(response.email, response.localId, response.idToken, +response.expiresIn)
        })
      );
  }

  logout() {
    console.log('logout');
    localStorage.removeItem("user")
    this.user.next(null);
    this.router.navigate(['/auth'])
  }

  autoLogin(){
    const userString = localStorage.getItem("user");
    const user = userString !== null ? JSON.parse(userString) : null;


    if(!user){
      return;
    }

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user.expirationDate)
    );

    if(loadedUser.token){
      this.user.next(loadedUser)
    }
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(
      new Date().getTime() + (expiresIn * 1000)
    );
    const user = new User(
      email,
      userId,
      token,
      expirationDate
    );

    this.user.next(user);

    localStorage.setItem("user", JSON.stringify(user))
  
  }
}
