import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any = [];
  assignModel: any = {};
  itemForm: FormGroup;
  showMessage: any;
  responseMessage: any;
  maintenanceList: any = [];
  maintenanceObj: any = {};

  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder, private authService: AuthService) {
    this.itemForm = this.formBuilder.group({
      maintenanceId: [''],
      scheduledDate: ['', Validators.required],
      completedDate: ['', Validators.required],
      description: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getMaintenance();
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    //complete this function
    return null;
  }

  getMaintenance() {
    this.httpService.getMaintenance().subscribe(
      (data) => {
        this.maintenanceList = data;
      },
      (error) => {
        console.error('Error fetching maintenance data:', error);
      }
    );
  }

  viewDetails(details: any) {
    //complete this function
  }

  edit(val: any) {
    //complete this function
  }

  update() {
    this.httpService.updateMaintenance(this.itemForm.value, this.itemForm.value.maintenanceId).subscribe(
      (data) => {
        this.responseMessage = 'Maintenance updated successfully.';
        this.showMessage = true;
        // Refresh maintenance list
        this.getMaintenance();
      },
      (error) => {
        console.error('Error updating maintenance:', error);
        this.responseMessage = 'Error updating maintenance.';
        this.showMessage = true;
      }
    );
  }
}