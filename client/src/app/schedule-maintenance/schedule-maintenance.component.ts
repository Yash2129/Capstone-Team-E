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

// schedule Maintenance component.ts 
export class ScheduleMaintenanceComponent implements OnInit {
  // initializing the fields
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
    // Initialize form group
    this.itemForm = this.formBuilder.group({
      scheduledDate: [this.formModel.scheduledDate, [Validators.required, this.dateValidator]],
      completedDate: [this.formModel.completedDate, [Validators.required, this.dateValidator]],
      description: [this.formModel.description, [Validators.required]],
      status: [this.formModel.status, [Validators.required]],
      equipmentId: [this.formModel.equipmentId, [Validators.required]],
      hospitalId: [this.formModel.hospitalId, [Validators.required]],

    });
  }

  // On loading the web page
  ngOnInit(): void {
    this.getHospital();
  }

  // date validation 
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }

    return null;
  }

  // retrieving the hospital list
  getHospital() {
    this.hospitalList = [];
    this.httpService.getHospital().subscribe((data: any) => {
      this.hospitalList = data;
      console.log(this.hospitalList);
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = error;
    });;
  }

  // on submission of form status
  onSubmit() {
    debugger;
    if (this.itemForm.valid) {
      if (this.itemForm.valid) {
        this.showError = false;

        this.httpService.scheduleMaintenance(this.itemForm.value, this.itemForm.value.equipmentId).subscribe((data: any) => {
          this.itemForm.reset();
          this.showMessage = true;
          this.responseMessage = 'Save Successfully';

        }, error => {
          // Handle error
          this.showError = true;
          this.errorMessage = error;

        })
      } else {
        this.itemForm.markAllAsTouched();
      }
    }
    else {
      this.itemForm.markAllAsTouched();
    }
  }

  // after selecting the hospital
  onHospitalSelect($event: any) {
    let id = $event.target.value
    this.equipmentList = [];
    this.httpService.getEquipmentById(id).subscribe((data: any) => {
      this.equipmentList = data;
      console.log(this.equipmentList);
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = error;
    });

  }
}

