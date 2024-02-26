import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  // providers: [AuthService]
})
export class HomepageComponent implements OnInit {
  isAuthenticated = false;

  constructor(
    // private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  // isauth$ = this.authService.user.asObservable().pipe(map((user) => !!user)); //ileri seviye yapma

  ngOnInit(): void {
    this.authService.user.subscribe((user) => {
      // console.log(user);
      this.isAuthenticated = user == null ? false : true;
      // console.log(this.isAuthenticated);
    });

  
  }

  logout(): void {
    console.log('logout');
    this.authService.logout();
  }
}
