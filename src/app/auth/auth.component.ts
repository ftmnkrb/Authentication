import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms'
import { AuthService } from '../services/auth.service'
import { Observable } from 'rxjs'
import { AuthResponse } from '../models/AuthResponse'
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http' //emin değilim
import { confirmPasswordValidator } from '../shared/validators' // import ettik.
import { cities } from './cities'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  // 6. başlangıçta login gelsin
  isLoginMode: boolean = true
  loading: boolean = false
  error: string | null = '';

  myForm!: FormGroup

  cities = cities;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // 5. daha önce formu yukarıda static olarak oluşturmuştuk. fonksiyona aldığımız için burada fonksiyonu çağırdık.
    this.createForm()
  }

  onToggleMode() {
    this.isLoginMode = !this.isLoginMode
  }

  //error bilgisine null atıyoruz.

  closeDialog(){
    this.error = null; 
  }

  myFormSubmit() {
    if (this.myForm.invalid) return

    const email = this.myForm.get('email')?.value!
    const password = this.myForm.get('password')?.value!
    const name = this.myForm.get('name')?.value!
    const location = this.myForm.get('location')?.value!

    this.loading = true

    let authResponse: Observable<AuthResponse>

    if (this.isLoginMode) {
      authResponse = this.authService.login(email, password)
    } else {
      authResponse = this.authService.signUp(email, password, name, location)
    }

    authResponse.subscribe(
      (response) => {
        this.loading = false

        if (this.isLoginMode) {
          // 1. ilk olarak login oluyorsa yönlendirme yaptık.
          this.router.navigate(['/'])
        } else {
          // 2. register oluyorsa loginMode = true; yapıp createForm fonksiyonunu çağırdık bu fonksiyonda da
          this.isLoginMode = true
          this.createForm()
        }
      },
      (err) => {
        this.error = err
        this.loading = false
      },
    )

    this.myForm.reset()
  }

  // select city
 
  createForm() {
    // 3. loginMode kontrolüne göre form'u oluşturduk. loginMode = true ise loginForm'u oluşturduk
    if (this.isLoginMode) {
      this.myForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
      })
    } else {
      // 4. loginMode = false ise register için formu güncelledik
      this.myForm = new FormGroup(
        {
          name: new FormControl('', Validators.required),
          email: new FormControl('', [Validators.required, Validators.email]),
          password: new FormControl('', [
            Validators.required,
            Validators.minLength(6),
          ]),
          rePassword: new FormControl(''),
          location: new FormControl(''),
        },
        { validators: confirmPasswordValidator },
      )
    }
  }



 

  

}
