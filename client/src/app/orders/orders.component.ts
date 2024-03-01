import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  selectedStatus:string='';

 isRowEven(index: number): boolean {
  return index % 2 === 0;
}
   showError:boolean=false;
   errorMessage:any;

   showMessage: any;
   responseMessage: any;
   orderList: any=[];

   statusModel:any={newStatus:null}
   constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
  {
  }  
 ngOnInit(): void {
   this.getOrders();
   }  
 
   getOrders() {
     this.orderList=[];
     this.httpService.getorders().subscribe((data: any) => {
       this.orderList=data;
       console.log(data)
     }, error => {
       // Handle error
       this.showError = true;
       this.errorMessage = "An error occurred while logging in. Please try again later.";
       console.error('Login error:', error);
     });;
   }
  //  viewDetails(details:any)
  //  {
    
  //  }
   edit(value:any)
   {
    this.statusModel.cargoId=value.id
   }
   update()
   {
    if(this.statusModel.newStatus!=null)
    {
      this.showMessage = false;
      this.httpService.UpdateOrderStatus(this.statusModel.newStatus,this.statusModel.cargoId).subscribe((data: any) => {
        debugger;
        this.showMessage = true;
        this.responseMessage=`Status updated`;
        this.getOrders();
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while logging in. Please try again later.";
        console.error('Login error:', error);
      });;
    }
   }
   

  getOrdersfilter() {
    this.orderList = [];
    this.httpService.getorders().subscribe((data: any) => {
      // Assuming 'Initiated' is the default status to display
      //this.maintenanceList = this.filterMaintenanceByStatus(data, null); //this.selected_Status
      this.orderList = this.filterOrdersByStatus(data, this.selectedStatus);
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });
  }


filterOrdersByStatus(data: any[], status: string | null): any[] {
    if(!status){
      return data;
    }
    if (data && data.length > 0) {
      return data.filter(order => order.status === status);
    } else {
      return [];
    }
  }


 }
 
 