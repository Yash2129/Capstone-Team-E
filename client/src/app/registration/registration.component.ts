import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html'

})
export class RegistrationComponent {

  itemForm: FormGroup;
  formModel: any = { role: null, email: '', password: '', username: '' };
  showMessage: boolean = false;
  confirmPassword: any;
  responseMessage: any;
  responseError: any;
  showError: boolean = false;
  userModel: any = { role: '', email: '', password: '', username: '' };
  constructor(public router: Router, private bookService: HttpService, private formBuilder: FormBuilder) {

    this.itemForm = this.formBuilder.group({
      email: [this.formModel.email, [Validators.required, Validators.email]],
      password: [this.formModel.password, [Validators.required]],
      role: [this.formModel.role, [Validators.required]],
      username: [this.formModel.username, [Validators.required]],
      repassword: [this.formModel.repassword, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }


  onRegister() {
    if (this.itemForm.valid) {
      if (this.itemForm.value.password === this.itemForm.value.repassword) {
        this.userModel.role = this.itemForm.value.role;
        this.userModel.email = this.itemForm.value.email;
        this.userModel.username = this.itemForm.value.username;
        this.userModel.password = this.itemForm.value.password;

        this.showMessage = false;
        this.showMessage = false;
        this.bookService.registerUser(this.userModel).subscribe(data => {
          debugger;
          this.showMessage = true;
          this.responseMessage = 'Welcome ' + data.username + " you are successfully registered";
          this.itemForm.reset();

        },
          (error: any) => {
            this.showError = true;
            this.responseError = 'An error occurred while registering.';
          })
      }
      else {
        this.showError = true;
        this.responseError = 'Password do not match';
      }

    }
    else {
      this.itemForm.markAllAsTouched();
    }
  }


}
