import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, map, tap } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({ providedIn: 'root'})
export class AuthGuard implements CanActivate{

     constructor(private authService: AuthService, private router: Router){}

     //koruma amaçlı. giriş yapmayan kullanıcıların seçtiğimiz sayfalar agiriş yapmasını engellemek 

     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
     return this.authService.user.pipe(
          map(user => {return !!user}),         //true yada false değerinde bir değer döncek observable
          tap(isAuth => {  if(!isAuth){this.router.navigate(['/auth'])}   })     //giriş yapmayan bir kullanıcı /auth ye yönlendirilecek.            
     )

}

}