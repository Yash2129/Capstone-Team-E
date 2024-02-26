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

  showError:boolean=false;
  errorMessage:any;
  showMessage: any;
  responseMessage: any;
  orderList: any=[];
  statusModel:any={newStatus:null}

  constructor(
    public router:Router, 
    public httpService:HttpService, 
    private formBuilder: FormBuilder, 
    private authService:AuthService
  ) {}

  ngOnInit(): void {
    this.getOrders(); // Call getOrders function when component initializes
  }

  getOrders() {
    this.httpService.getorders().subscribe(
      (response: any) => {
        // Handle successful response
        this.orderList = response; // Assign response data to orderList
      },
      (error: any) => {
        // Handle error
        this.showError = true;
        this.errorMessage = error.message || 'An error occurred while fetching orders.';
      }
    );
  }

  viewDetails(details:any) {
    // complete this function
  }

  edit(order:any) {
    // complete this function
    console.log('Edit order:', order);
  }

  update() {
    const orderIdToUpdate = 'your_order_id_here'; // Specify the order ID you want to update
    const newStatus = this.statusModel.newStatus;

    if (!newStatus) {
      this.showError = true;
      this.errorMessage = 'Please provide a new status.';
      return;
    }

    this.httpService.UpdateOrderStatus(newStatus, orderIdToUpdate).subscribe(
      (response: any) => {
        // Handle successful response
        this.responseMessage = response.message || 'Order status updated successfully.';
        this.showMessage = true;
        this.getOrders(); // Refresh the order list after update
      },
      (error: any) => {
        // Handle error
        this.showError = true;
        this.errorMessage = error.message || 'An error occurred while updating order status.';
      }
    );
  }
}
 
 