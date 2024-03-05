import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = {};
  showError: boolean = false;
  errorMessage: any;
  show: boolean = false;

  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.itemForm = this.formBuilder.group({
      username: [this.formModel.username, [Validators.required]],
      password: [this.formModel.password, [Validators.required]],
    });
  }

  ngOnInit(): void { }

  toggle() {
    const password = document.getElementById('password');
    const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
    password?.setAttribute('type', type);
  }

  onLogin() {
    if (this.itemForm.valid) {
      this.showError = false;
      this.httpService.Login(this.itemForm.value).subscribe((data: any) => {
        if (data.userNo != 0) {
          // Successful login
          this.authService.SetRole(data.role);
          this.authService.SetUsername(data.username);
          this.authService.saveToken(data.token)
          this.router.navigateByUrl('/dashboard');
          setTimeout(() => {
            window.location.reload();
          }, 1);
        } else {
          // Incorrect credentials
          this.showError = true;
          this.errorMessage = "Wrong User or Password";
        }
      }, error => {
        // Handle error
        this.showError = true;
        if (error) {
          // Handle custom exception
          this.errorMessage = error;
        } else {
          // Default error message
          this.errorMessage = "An error occurred while logging in. Please try again later.";
        }

      });
    } else {
      // Form validation failed
      this.itemForm.markAllAsTouched();
    }
  }

  registration() {
    this.router.navigateByUrl('/registration');
  }
}
