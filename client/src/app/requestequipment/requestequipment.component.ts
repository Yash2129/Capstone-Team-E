import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-requestequipment',
  templateUrl: './requestequipment.component.html',
  styleUrls: ['./requestequipment.component.scss']
})
export class RequestequipmentComponent implements OnInit {
  itemForm: FormGroup;
  showError: boolean = false;
  errorMessage: string = '';
  showMessage: boolean = false;
  responseMessage: string = '';
  hospitalList: any[] = [];
  equipmentList: any[] = [];

  constructor(
    public router: Router,
    public httpService: HttpService,
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {
    this.itemForm = this.formBuilder.group({
      hospitalId: ['', Validators.required],
      equipmentId: ['', Validators.required],
      orderDate: ['', Validators.required],
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

  dateValidator(control: AbstractControl): ValidationErrors | null {
    // You can implement custom date validation logic here
    const currentDate = new Date();
    const selectedDate = new Date(control.value);

    if (selectedDate < currentDate) {
      return { pastDate: true };
    }

    return null;
  }

  onSubmit() {
    if (this.itemForm.invalid) {
      this.showError = true;
      this.errorMessage = 'Please fill all the required fields correctly.';
      return;
    }

    const requestData = this.itemForm.value;
    this.httpService.orderEquipment(requestData, requestData.equipmentId).subscribe(
      (response: any) => {
        this.showError = true;
        this.responseMessage = 'Equipment order placed successfully.';
        // Reset the form after successful submission
        this.itemForm.reset();
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = error.message || 'An error occurred while placing the order.';
      }
    );
  }

  onHospitalSelect(event: any) {
    const hospitalId = event.target.value;
    // Assuming you have a method in your HttpService to fetch equipment by hospitalId
    this.httpService.getEquipmentById(hospitalId).subscribe(
      (response: any) => {
        this.equipmentList = response;
      },
      (error: any) => {
        this.showError = true;
        this.errorMessage = error.message || 'An error occurred while fetching equipment.';
      }
    );
  }
}