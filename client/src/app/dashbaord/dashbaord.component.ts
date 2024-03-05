import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})

// Dashboard component
export class DashbaordComponent implements OnInit{

  // Dashboard fields
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any = [];
  ordersList: any[] = [];

  showMessage: boolean = false;
  responseMessage: any;
  maintenanceList: any[] = [];
 
  completedOrdersCount: number = 0;
  initiatedOrdersCount: number = 0;
  userRole: any ='';
  username: any ='';
  constructor(public router: Router, public httpService: HttpService, private authService: AuthService) {
    
  }

  // on initially loading the webpage
  ngOnInit(): void {
    
    this.userRole=this.authService.getRole;
    this.username=this.authService.getUsername;
    if(this.userRole ==="HOSPITAL"){
      this.getHospital();
    }
    else if(this.userRole === "TECHNICIAN"){
      this.getMaintenance();
    }
    else if(this.userRole === "SUPPLIER"){
      this.getorders();
    }
  }

  // retrieving the list of hospitals and handling the error
  getHospital() {
    this.hospitalList = [];
    this.httpService.getHospital().subscribe((data: any) => {
      this.hospitalList = data;
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = error;
    });
  }

  // retrieving the list of maintenance equipments and handling the error
  getMaintenance() {
    this.httpService.getMaintenance().subscribe(
      (data: any[]) => {
        this.maintenanceList = data;
        this.calculateCounts();
      },
      error => {
        this.showError = true;
        this.errorMessage = "An error occurred while fetching maintenance data. Please try again later.";
        console.error('Maintenance data fetch error:', error);
      }
    );
  }

  // Retrieving the count based on status
  calculateCounts() {
    this.completedOrdersCount = this.maintenanceList.filter(maintenance => maintenance.status === 'Complete').length;
    this.initiatedOrdersCount = this.maintenanceList.filter(maintenance => maintenance.status === 'Initiated').length;
  }
  calculateOrderCounts() {
    this.completedOrdersCount = this.ordersList.filter(order => order.status === 'Complete').length;
    this.initiatedOrdersCount = this.ordersList.filter(order => order.status === 'Initiated').length;
  }

  getorders() {
    this.httpService.getorders().subscribe(
      (data: any[]) => {
        this.ordersList = data;
        this.calculateOrderCounts();
      },
      error => {
        this.showError = true;
        this.errorMessage = error;
      }
    );
  }
}
