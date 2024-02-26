import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-schedule-maintenance',
  templateUrl: './schedule-maintenance.component.html',
  styleUrls: ['./schedule-maintenance.component.scss']
})
export class ScheduleMaintenanceComponent implements OnInit {
  itemForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any = [];
  assignModel: any = {};
  showMessage: any;
  responseMessage: any;
  equipmentList: any = [];

  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.itemForm = this.formBuilder.group({
      hospitalId: ['', Validators.required],
      equipmentId: ['', Validators.required],
      scheduledDate: ['', Validators.required],
      completedDate: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    // Implement date validation logic if needed
    return null;
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

    // Call the service method to schedule maintenance
    this.httpService.scheduleMaintenance(this.itemForm.value, this.itemForm.value.equipmentId).subscribe(
      (response: any) => {
        this.showMessage = true;
        this.responseMessage = 'Maintenance scheduled successfully.';
        // Reset the form after successful submission
        this.itemForm.reset();
      },
      (error: any) => {
        this.showError = true;
        this.responseMessage = error.message || 'An error occurred while scheduling maintenance.';
      }
    );
  }

  onHospitalSelect($event: any) {
    // Handle hospital selection event
    let id = $event.target.value;
    this.httpService.getEquipmentById(id).subscribe((response: any) => {
      this.equipmentList = response;
    });
  }
}