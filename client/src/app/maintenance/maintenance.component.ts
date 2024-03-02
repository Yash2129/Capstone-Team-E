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
  // itemForm: FormGroup;
  selectedStatus: string = ''; // Default value to display all maintenance items
  searchQuery: string = '';
  
  formModel:any={status:null};
  showError:boolean=false;
  errorMessage:any;
  hospitalList:any=[];
  itemForm: FormGroup;
  showMessage: any;
  responseMessage: any;
  maintenanceList: any=[];
  maintenanceObj: any={};
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService)
    {
      this.itemForm = this.formBuilder.group({
        scheduledDate: [this.formModel.scheduledDate,[ Validators.required, this.dateValidator]],
        completedDate: [this.formModel.completedDate,[ Validators.required, this.dateValidator]],
        description: [this.formModel.description,[ Validators.required]],
        status: [this.formModel.status,[ Validators.required]],
        maintenanceId: [this.formModel.maintenanceId],
 
       
    });
 
 
 
}  
ngOnInit(): void {
  this.getMaintenance();
  }  
  dateValidator(control: AbstractControl): ValidationErrors | null {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
 
    if (!datePattern.test(control.value)) {
      return { invalidDate: true };
    }
 
    return null;
  }
 
  getMaintenance() {
    this.maintenanceList = [];
    this.httpService.getMaintenance().subscribe((data: any) => {
      // Assuming 'Initiated' is the default status to display
      //this.maintenanceList = this.filterMaintenanceByStatus(data, null); //this.selected_Status
      this.maintenanceList = this.filterMaintenanceByStatus(data, this.selectedStatus);
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });
  }
   
  // Method to filter maintenance list by status
  filterMaintenanceByStatus(data: any[], status: string | null): any[] {
    if(!status){
      return data;
    }
    if (data && data.length > 0) {
      return data.filter(maintenance => maintenance.status === status);
    } else {
      return [];
    }
  }
  searchByEquipmentName(query: string) {
    if(query.trim() === '') {
      this.getMaintenance();
      return;
    }
    this.maintenanceList = this.maintenanceList.filter((maintenance: { equipmentName: string; }) => maintenance.equipmentName.toLowerCase().includes(query.toLowerCase()));
  }
//   filterMaintenanceByEquipmentName(equipmentName: string) {
//     if (equipmentName) {
//       this.httpService.getMaintenance().subscribe((data: any) => {
// this.maintenanceList = data.filter(maintenance => maintenance.equipment.name.toLowerCase().includes(equipmentName.toLowerCase()));
//       }, error => {
//         this.showError = true;
//         this.errorMessage = "An error occurred while filtering maintenance by equipment name.";
//         console.error('Filtering error:', error);
//       });
//     } else {
//       this.getMaintenance(); // If equipmentName is empty, get all maintenance items
//     }
//   }
  onSearchInputChange(event: Event) {
    const target = event.target as HTMLInputElement;
    const value = target.value.trim();
    this.searchByEquipmentName(value);
  }
//   //added
//   searchByEquipmentName(): void {
//     if (this.searchQuery.trim() !== '') {
//         this.maintenanceList = this.maintenanceList.filter(maintenance =>
// maintenance.equipment.name.toLowerCase().includes(this.searchQuery.toLowerCase())
//         );
//     } else {
//         this.getMaintenance(); // Reset to display all maintenance items if search query is empty
//     }
// }
  //old code
  // getMaintenance() {
  //   this.maintenanceList=[];
  //   this.httpService.getMaintenance().subscribe((data: any) => {
  //     this.maintenanceList=data;
  //    console.log(data)
  //   }, error => {
  //     // Handle error
  //     this.showError = true;
  //     this.errorMessage = "An error occurred while logging in. Please try again later.";
  //     console.error('Login error:', error);
  //   });;
  // }
  // //added
  // filterMaintenanceByStatus(data: any[], status: string) {
  //   if (data && data.length > 0) {
  //     this.maintenanceList = data.filter(maintenance => maintenance.status === status);
  //     return this.maintenanceList;
  //   }else{return[]}}
//////
 
  edit(val:any)
  {
    const scheduledDate =new Date(val.scheduledDate); // Convert string to Date object
    const completedDate =new Date(val.completedDate); // Convert string to Date object
    this.itemForm.patchValue({
      scheduledDate:  scheduledDate.toISOString().substring(0, 10),
      completedDate: completedDate.toISOString().substring(0, 10),
      description: val.description,
      status: val.status,
      equipmentId: val.equipmentId,
      maintenanceId:val.id
  });
  }
  update()
  {
    if(this.itemForm.valid)
    {
      if (this.itemForm.valid) {
        this.showError = false;
        this.httpService.updateMaintenance(this.itemForm.value,this.itemForm.controls['maintenanceId'].value).subscribe((data: any) => {
          this.itemForm.reset();
     
          window.location.reload();
        }, error => {
          // Handle error
          this.showError = true;
          this.errorMessage = "An error occurred while logging in. Please try again later.";
          console.error('Login error:', error);
        });;
      } else {
        this.itemForm.markAllAsTouched();
      }
    }
    else{
      this.itemForm.markAllAsTouched();
    }
  }
}
// isRowEven(index: number): boolean {
//   return index % 2 === 0;
// }
 
// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';


// @Component({
//   selector: 'app-maintenance',
//   templateUrl: './maintenance.component.html',
//   styleUrls: ['./maintenance.component.scss']
// })
// export class MaintenanceComponent implements OnInit {
//   // itemForm: FormGroup;
//   selectedStatus: string = ''; // Default value to display all maintenance items
//   searchQuery: string = '';
//   formModel:any={status:null};
//   showError:boolean=false;
//   errorMessage:any;
//   hospitalList:any=[];
//   itemForm: FormGroup;
//   showMessage: any;
//   responseMessage: any;
//   maintenanceList: any=[];
//   maintenanceObj: any={};
//   constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService) 
//     {
//       this.itemForm = this.formBuilder.group({
//         scheduledDate: [this.formModel.scheduledDate,[ Validators.required, this.dateValidator]],
//         completedDate: [this.formModel.completedDate,[ Validators.required, this.dateValidator]],
//         description: [this.formModel.description,[ Validators.required]], 
//         status: [this.formModel.status,[ Validators.required]], 
//         maintenanceId: [this.formModel.maintenanceId],
 
       
//     });



// }  
// ngOnInit(): void {
//   this.getMaintenance();
//   }  
//   dateValidator(control: AbstractControl): ValidationErrors | null {
//     const datePattern = /^\d{4}-\d{2}-\d{2}$/;

//     if (!datePattern.test(control.value)) {
//       return { invalidDate: true };
//     }

//     return null;
//   }

//   getMaintenance() {
//     this.maintenanceList = [];
//     this.httpService.getMaintenance().subscribe((data: any) => {
//       // Assuming 'Initiated' is the default status to display
//       //this.maintenanceList = this.filterMaintenanceByStatus(data, null); //this.selected_Status
//       this.maintenanceList = this.filterMaintenanceByStatus(data, this.selectedStatus);
//     }, error => {
//       // Handle error
//       this.showError = true;
//       this.errorMessage = "An error occurred while logging in. Please try again later.";
//       console.error('Login error:', error);
//     });
//   }
   
//   // Method to filter maintenance list by status
//   filterMaintenanceByStatus(data: any[], status: string | null): any[] {
//     if(!status){
//       return data;
//     }
//     if (data && data.length > 0) {
//       return data.filter(maintenance => maintenance.status === status);
//     } else {
//       return [];
//     }
//   }
//   //old code
//   // getMaintenance() {
//   //   this.maintenanceList=[];
//   //   this.httpService.getMaintenance().subscribe((data: any) => {
//   //     this.maintenanceList=data;
//   //    console.log(data)
//   //   }, error => {
//   //     // Handle error
//   //     this.showError = true;
//   //     this.errorMessage = "An error occurred while logging in. Please try again later.";
//   //     console.error('Login error:', error);
//   //   });;
//   // }
//   // //added
//   // filterMaintenanceByStatus(data: any[], status: string) {
//   //   if (data && data.length > 0) {
//   //     this.maintenanceList = data.filter(maintenance => maintenance.status === status);
//   //     return this.maintenanceList;
//   //   }else{return[]}}
// //////

//   edit(val:any)
//   {
//     const scheduledDate =new Date(val.scheduledDate); // Convert string to Date object
//     const completedDate =new Date(val.completedDate); // Convert string to Date object
//     this.itemForm.patchValue({
//       scheduledDate:  scheduledDate.toISOString().substring(0, 10),
//       completedDate: completedDate.toISOString().substring(0, 10),
//       description: val.description,
//       status: val.status,
//       equipmentId: val.equipmentId,
//       maintenanceId:val.id
//   });
//   }
  
//   update()
//   {
//     if(this.itemForm.valid)
//     {
//       if (this.itemForm.valid) {
//         this.showError = false;
//         this.httpService.updateMaintenance(this.itemForm.value,this.itemForm.controls['maintenanceId'].value).subscribe((data: any) => {
//           this.itemForm.reset();
      
//           window.location.reload();
//         }, error => {
//           // Handle error
//           this.showError = true;
//           this.errorMessage = "An error occurred while logging in. Please try again later.";
//           console.error('Login error:', error);
//         });;
//       } else {
//         this.itemForm.markAllAsTouched();
//       }
//     }
//     else{
//       this.itemForm.markAllAsTouched();
//     }
//   }
// }
// // isRowEven(index: number): boolean {
// //   return index % 2 === 0;
// // }
