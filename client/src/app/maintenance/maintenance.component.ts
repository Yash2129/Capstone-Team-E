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
      scheduledDate: ['', [Validators.required, this.dateValidator]],
      completedDate: ['',[Validators.required, this.dateComparisonValidator(),this.dateValidator]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getMaintenance();
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    //complete this function
    const datePattern = /^\d{4}-\d{2}-\d{2}$/
    if(!datePattern.test(control.value)) return {datePatternChecker:true};
    return null;
  }

  
  //added
  dateComparisonValidator() {
    return (formGroup: FormGroup): { [key: string]: any } | null => {
      const scheduledDate = formGroup.get('scheduledDate');
      const completeDate = formGroup.get('completeDate');
  
      if (scheduledDate && completeDate && scheduledDate.value && completeDate.value) {
        const scheduledDateValue = new Date(scheduledDate.value);
        const completeDateValue = new Date(completeDate.value);
  
        if (scheduledDateValue > completeDateValue) {
          return { dateComparison: true };
        }
      }
  
      return null;
    };
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