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

// Order component
export class OrdersComponent implements OnInit {

  selectedStatus: string = '';
  searchInput: string = '';
  showError: boolean = false;
  errorMessage: any;

  showMessage: any;
  responseMessage: any;
  orderList: any = [];
  orderList2: any = [];

  statusModel: any = { newStatus: null }
  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder, private authService: AuthService) {
  }

  // to initially load orders on loading the webpage
  ngOnInit(): void {
    this.getOrders();
  }

  //  retrieving the orders from the database through http service 
  getOrders() {
    this.orderList = [];
    this.httpService.getorders().subscribe((data: any) => {
      this.orderList = data;
      this.orderList2 = data;
      console.log(data)
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });;
  }

  edit(value: any) {
    this.statusModel.cargoId = value.id
  }

  //  for updating the order status
  update() {
    this.showMessage = false;
    this.httpService.UpdateOrderStatus("Complete", this.statusModel.cargoId).subscribe((data: any) => {
      debugger;
      this.showMessage = true;
      this.responseMessage = `Status updated`;
      this.getOrders();
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while updating status. Please try again later.";
      console.error('Status update error:', error);
    });;
  }

  //  filtering the orders by status
  getOrdersfilter() {
    this.orderList = [];
    this.httpService.getorders().subscribe((data: any) => {
      this.orderList = this.filterOrdersByStatus(data, this.selectedStatus);
      this.searchInput = "";
      this.orderList2 = this.orderList;
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while retrieving orders. Please try again later.";
      console.error('Retrieval error:', error);
    });
  }

  filterOrdersByStatus(data: any[], status: string | null): any[] {
    if (data && status === "") {
      return data;
    }
    if (data && data.length > 0) {
      return data.filter(order => order.status === status);
    } else {
      return data;
    }
  }

  // event binding for the search input of hospital name 
  onSearchInput(event: any) {
    const searchValue = event.target.value;
    this.searchInput = searchValue;
    this.orderList = this.orderList2;
    this.getOrdersViaInput();
  }

  // filtering the orders by searching the hospital name
  getOrdersViaInput() {
    this.orderList = this.filterOrdersByName(this.orderList, this.searchInput);
  }

  filterOrdersByName(orders: any[], search: string | null) {
    if (!search) {
      return orders;
    }
    search = search.toLowerCase();
    return orders.filter(order => order.equipment.hospital.name.toLowerCase().includes(search));
  }
}

