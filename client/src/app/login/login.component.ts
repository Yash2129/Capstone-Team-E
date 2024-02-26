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
  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.itemForm = this.formBuilder.group({
      //compelete this
      username: ["", [Validators.required]],
      password: ["", [Validators.required]]

    });
  }

  ngOnInit(): void {
  }

  onLogin() {
    //compelete this
    if (this.itemForm.invalid) {
      this.showError = true;
      this.errorMessage = 'Please fill all the required fields.';
      return;
    }

    this.httpService.Login(this.itemForm.value).subscribe(
      (response: any) => {
        this.router.navigate(['/dashboard']);
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = error.message || 'An error occurred while logging in.';
      }
    );
  }

  registration() {
    
    this.router.navigate(['/registration']);
  }
}