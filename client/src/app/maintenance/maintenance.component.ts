
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})

// Maintenance component
export class MaintenanceComponent implements OnInit {

  // Define properties
  selectedStatus: string = '';
  searchInput: string = '';
  showError: boolean = false;
  errorMessage: any;
  itemForm: FormGroup;             // Form group for maintenance item
  showMessage: any;
  responseMessage: any;
  maintenanceList: any = [];
  paginatedMaintenanceList: any = []; // Paginated maintenance list
  totalItems: number = 0; // Total number of maintenance items
  pageSize: number = 5; // Number of items per page
  currentPage: number = 1; // Current page number
  totalPages: number = 0; // Total number of pages
  pages: number[] = []; // Array to hold page numbers for pagination

  constructor(public router: Router, public httpService: HttpService, private formBuilder: FormBuilder) {
    // Initialize form group
    this.itemForm = this.formBuilder.group({
      scheduledDate: ['', [Validators.required, this.dateValidator]],
      completedDate: ['', [Validators.required, this.dateValidator]],
      description: ['', [Validators.required]],
      status: ['', [Validators.required]],
      maintenanceId: [''],
    });
  }

  ngOnInit(): void {
    this.getMaintenance();   // Fetch maintenance data on component initialization
  }

  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;

    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }

    return null;
  }

  // Method to fetch maintenance data
  getMaintenance() {
    this.maintenanceList = []; // Clear maintenance list
    this.httpService.getMaintenance().subscribe((data: any) => {
      this.totalItems = data.length; // Update totalItems
      this.maintenanceList = this.filterMaintenanceByStatus(data, this.selectedStatus); // Fetch maintenance data from API
      this.setPage(1); // Set initial page
    }, error => {
      this.showError = true;
      this.errorMessage = error;
    });
  }

  // Method to filter maintenance data by status
  filterMaintenanceByStatus(data: any[], status: string | null): any[] {
    if (!status) {
      return data;
    }
    if (data && data.length > 0) {
      return data.filter(maintenance => maintenance.status === status);
    } else {
      return [];
    }
  }

  // Method to handle search input
  onSearchInput(event: any) {
    const searchValue = event.target.value;
    this.searchInput = searchValue;
    this.getMaintenanceViaInput();
  }

  // Method to fetch maintenance data via input
  getMaintenanceViaInput() {
    this.maintenanceList = [];
    this.httpService.getMaintenance().subscribe((maintenance: any) => {
      this.maintenanceList = this.filterMaintenanceByStatus(maintenance, this.selectedStatus);
      this.maintenanceList = this.filterMaintenanceByName(this.maintenanceList, this.searchInput);
      this.setPage(1); // Reset pagination to the first page
    }, error => {
      this.showError = true;
      this.errorMessage = error;
    });
  }

  // Method to filter maintenance data by name
  filterMaintenanceByName(maintenance: any[], search: string | null): any[] {
    if (!search) {
      return maintenance;
    }
    search = search.toLowerCase();
    return maintenance.filter(x =>
      x.equipment.hospital.name.toLowerCase().includes(search) ||
      x.equipment.name.toLowerCase().includes(search) ||
      x.equipment.hospital.id.toString().includes(search)
    );
  }

  // Method to handle page change
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.totalItems);
    this.paginatedMaintenanceList = this.maintenanceList.slice(startIndex, endIndex);
    this.calculatePageNumbers();
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.setPage(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.setPage(this.currentPage + 1);
    }
  }

  calculatePageNumbers() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
    this.pages = [];
    for (let i = 1; i <= this.totalPages; i++) {
      this.pages.push(i);
    }
  }

  // Method to edit maintenance record
  edit(val: any) {
    const scheduledDate = new Date(val.scheduledDate);
    const completedDate = new Date(val.completedDate);
    this.itemForm.patchValue({
      scheduledDate: scheduledDate.toISOString().substring(0, 10),
      completedDate: completedDate.toISOString().substring(0, 10),
      description: val.description,
      status: val.status,
      equipmentId: val.equipmentId,
      maintenanceId: val.id
    });

    // Disable edit button if status is 'completed'
    if (val.status === 'Completed') {
      this.itemForm.disable();
    } else {
      this.itemForm.enable();
    }
  }

  // Method to update maintenance record
  update() {
    if (this.itemForm.valid) {
      if (this.itemForm.valid) {
        this.showError = false;
        this.httpService.updateMaintenance(this.itemForm.value, this.itemForm.controls['maintenanceId'].value).subscribe((data: any) => {
          this.itemForm.reset();
          window.location.reload();
        }, error => {
          // Handle error
          this.showError = true;
          this.errorMessage = error;
        });
      } else {
        this.itemForm.markAllAsTouched();
      }
    } else {
      this.itemForm.markAllAsTouched();
    }
  }
}