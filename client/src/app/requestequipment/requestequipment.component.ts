import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';

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

  constructor(private formBuilder: FormBuilder, private httpService: HttpService) {
    this.itemForm = this.formBuilder.group({
      orderDate: ['', [Validators.required]],  
      quantity: ['', [Validators.required]], 
      status: ['', [Validators.required]], 
      equipmentId: ['', [Validators.required]], 
      hospitalId: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getHospital();
  }

  getHospital() {
    this.httpService.getHospital().subscribe(
      (data: any) => {
        this.hospitalList = data;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  onSubmit() {
    if (this.itemForm.valid) {
      this.showError = false;
      this.httpService.orderEquipment(this.itemForm.value, this.itemForm.value.equipmentId).subscribe(
        (data: any) => {
          this.itemForm.reset();
          this.showMessage = true;
          this.responseMessage = 'Saved Successfully';
        },
        (error) => {
          this.handleError(error);
        }
      );
    } else {
      this.itemForm.markAllAsTouched();
    }
  }

  onHospitalSelect(event: any) {
    let id = event.target.value;
    this.httpService.getEquipmentById(id).subscribe(
      (data: any) => {
        this.equipmentList = data;
      },
      (error) => {
        this.handleError(error);
      }
    );
  }

  private handleError(error: any) {
    this.showError = true;
    this.errorMessage = error.error ? error.error.message : 'An error occurred.';
  }
}
