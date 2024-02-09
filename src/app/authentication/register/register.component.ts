import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/auth/auth.service';
import { routes } from 'src/app/shared/routes/routes';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public routes = routes;
  public CustomControler!: number | string | boolean;
  public passwordClass = false;
  public confirmPasswordClass = false
  public isValidConfirmPassword = false;

  form = new FormGroup({
    fullName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.form.controls;
  }

  constructor(private router: Router, private auth: AuthService) { }


  submit() {
    if (this.form.value.password != this.form.value.confirmPassword) {
      this.isValidConfirmPassword = true;
    } else {
      this.isValidConfirmPassword = false;
      this.auth.login(this.form.value.email ? this.form.value.email : '', this.form.value.password ? this.form.value.password : '');
    }
  }
  passwordFunc() {
    this.passwordClass = !this.passwordClass
  }
  confirmPasswordFunc() {
    this.confirmPasswordClass = !this.confirmPasswordClass
  }
}
