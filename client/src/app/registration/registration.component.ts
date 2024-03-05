import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
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

  usernameExists = false;
  showPass: boolean = false;
  showRepass: boolean = false;

  constructor(public router: Router, private bookService: HttpService, private formBuilder: FormBuilder) {

    this.itemForm = this.formBuilder.group({
      email: [this.formModel.email, [Validators.required, Validators.email, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: [this.formModel.password, [Validators.required, Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$#!%*?&])[A-Za-z\d$@$!%*?&].{7,}$")]],
      role: [this.formModel.role, [Validators.required]],
      username: [this.formModel.username, [Validators.required], [this.validateUsername.bind(this)]],
      repassword: [this.formModel.repassword, [Validators.required]],
    },
      {
        validator: this.matchPassword
      },
    );
  }

  ngOnInit(): void {
  }




  validateUsername(control: FormControl) {
    const username = control.value;
    return this.bookService.checkUsernameExists(username).pipe(
      map(res => {
        this.usernameExists = res;
        return res ? { usernameExists: true } : null;
      })
    );
  }



  matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const repassword = control.get('repassword');
    if (password?.value === repassword?.value) {
      return null;
    } else {
      return { notMatch: true };
    }
  }

  togglePassword() {
    const password = document.getElementById('password');
    const type = password?.getAttribute('type') === 'password' ? 'text' : 'password';
    password?.setAttribute('type', type);
  }

  toggleRepassword() {
    const repassword = document.getElementById('repassword');
    const type = repassword?.getAttribute('type') === 'password' ? 'text' : 'password';
    repassword?.setAttribute('type', type);
  }

  onRegister() {
    if (this.itemForm.valid) {
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
      this.itemForm.markAllAsTouched();
    }
  }


}
