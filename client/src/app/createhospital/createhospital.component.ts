import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-createhospital',
  templateUrl: './createhospital.component.html',
  styleUrls: ['./createhospital.component.scss']
})
export class CreatehospitalComponent implements OnInit {
  itemForm: FormGroup;
  equipmentForm: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';
  showMessage: boolean = false;
  responseMessage: string = '';
  hospitalList: any = [];

  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.itemForm = this.formBuilder.group({
      // Initialize your form controls here
      hospitalName: ['', Validators.required],
      location: ['', Validators.required],
      contactPerson: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]]
    });

    this.equipmentForm = this.formBuilder.group({
      // Initialize your equipment form controls here
      equipmentName: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  getHospital() {
    this.httpService.getHospital().subscribe(
      (response: any) => {
        this.hospitalList = response;
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = error.message || 'An error occurred while fetching hospitals.';
      }
    );
  }

  onSubmit() {
    if (this.itemForm.invalid) {
      this.showError = true;
      this.responseMessage = 'Please fill all the required fields correctly.';
      return;
    }

    this.httpService.createHospital(this.itemForm.value).subscribe(
      (response: any) => {
        this.showMessage = true;
        this.responseMessage = 'Hospital created successfully.';
        // Reset the form after successful submission
        this.itemForm.reset();
      },
      (error: any) => {
        this.showError = true;
        this.responseMessage = error.message || 'An error occurred while creating the hospital.';
      }
    );
  }

  Addequipment(value: any) {
    // Implement functionality to add equipment to hospital
  }

  submitEquipment() {
    // Implement functionality to submit equipment
  }
}