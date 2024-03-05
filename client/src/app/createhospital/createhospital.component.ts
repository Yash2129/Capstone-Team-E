import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-createhospital',
  templateUrl: './createhospital.component.html',
  styleUrls: ['./createhospital.component.scss']
})
export class CreatehospitalComponent implements OnInit {
  itemForm: FormGroup;
  equipmentForm: FormGroup;
  formModel: any = { status: null };
  showError: boolean = false;
  errorMessage: any;
  hospitalList: any = [];
  showMessage: boolean = false;
  responseMessage: any;
  //Search Properties
  searchInput: string = ''; //For Searching
  // Pagination properties
  pageSize: number = 5; // Number of items per page
  currentPage: number = 1; // Current page number
  totalPages: number = 0; // Total number of pages
  paginatedHospitalList: any = []; // Hospital list for the current page
  pages: number[] = []; // Array to hold page numbers for pagination

  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder) {
    this.itemForm = this.formBuilder.group({
      name: [this.formModel.name, [Validators.required]],
      location: [this.formModel.location, [Validators.required]],
    });

    this.equipmentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      hospitalId: ['', [Validators.required]],
    });
  }

  // On initialization, loading the hospital list
  ngOnInit(): void {
    this.getHospital();
  }

  // To get the list of hospital
  getHospital() {
    this.hospitalList = [];
    this.httpService.getHospital().subscribe((data: any) => {
      this.hospitalList = data;
      this.totalPages = Math.ceil(this.hospitalList.length / this.pageSize);
      this.setPage(this.currentPage);
    }, error => {
      this.showError = true;
      this.errorMessage = error;
    });
  }

  // To submit the form
  onSubmit() {
    if (this.itemForm.valid) {
      this.showError = false;
      this.httpService.createHospital(this.itemForm.value).subscribe((data: any) => {
        this.itemForm.reset();
        this.getHospital();
      }, error => {
        this.showError = true;
        this.errorMessage = error;
      });
    } else {
      this.itemForm.markAllAsTouched();
    }
  }

  // To set the equipment
  Addequipment(value: any) {
    this.equipmentForm.controls['hospitalId'].setValue(value.id);
  }

  // To add the equipment
  submitEquipment() {
    if (this.equipmentForm.valid) {
      this.showMessage = false;
      this.responseMessage = '';
      this.httpService.addEquipment(this.equipmentForm.value, this.equipmentForm.controls['hospitalId'].value).subscribe((data: any) => {
        this.showMessage = true;
        this.equipmentForm.reset();
        this.responseMessage = 'Equipment added successfully';
      }, error => {
        this.showError = true;
        this.errorMessage = error;
      });
    } else {
      this.equipmentForm.markAllAsTouched();
    }
  }

  // For Pagination  
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.hospitalList.length);
    this.paginatedHospitalList = this.hospitalList.slice(startIndex, endIndex);
    this.calculatePageNumbers();
  }

  // For going to previous page
  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  // For going to next page
  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  // To calculate the page numbers
  calculatePageNumbers() {
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  // For Searching
  filterHospitals(hospitals: any[], search: string | null) {
    if (!search) {
      return hospitals;
    }
    search = search.toLowerCase();
    return hospitals.filter(hospital => hospital.name.toLowerCase().includes(search) ||
      hospital.location.toLowerCase().includes(search) ||
      hospital.id.toString().toLowerCase().includes(search));
  }

  // To get the hospital while searching
  getHospitalsViaInput() {
    this.paginatedHospitalList = [];
    this.httpService.getHospital().subscribe((hospitals: any) => {
      this.hospitalList = hospitals;
      const filteredHospitals = this.filterHospitals(hospitals, this.searchInput);
      this.totalPages = Math.ceil(filteredHospitals.length / this.pageSize);
      this.paginatedHospitalList = filteredHospitals.slice(0, this.pageSize);
      this.currentPage = 1;
      this.calculatePageNumbers();
    }, error => {

      this.showError = true;
      this.errorMessage = error;
    });
  }

  // For searching
  onSearch(event: any) {
    const searchValue = event.target.value;
    this.searchInput = searchValue;
    this.getHospitalsViaInput();
  }

  // To close the window
  close() {
    window.location.reload();
  }

}