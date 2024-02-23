import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
// import { Movie } from '../models/movie';
// import { AlertifyService } from '../services/alertify.service';
// import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
  providers: [AuthService]
})
export class HomepageComponent implements OnInit {

  

  filterText: string = "";
  error: any;

  loading: boolean = false;
  isAuthenticated: boolean = false;


  constructor(
    // private activatedRoute: ActivatedRoute,
    private authService: AuthService) {}

  ngOnInit(): void {
  

this.authService.user.subscribe(user => {
  this.isAuthenticated = !!user;
})


  }

  

 





}
