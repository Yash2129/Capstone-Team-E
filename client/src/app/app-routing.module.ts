import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { CreatehospitalComponent } from './createhospital/createhospital.component';
import { ScheduleMaintenanceComponent } from './schedule-maintenance/schedule-maintenance.component';
import { RequestequipmentComponent } from './requestequipment/requestequipment.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { OrdersComponent } from './orders/orders.component';
import { HomepageComponent } from './homepage/homepage.component';
import { HospitalGuard } from '../services/authGuard/hospital.guard';
import { TechnicianGuard } from '../services/authGuard/technician.guard';
import { SupplierGuard } from '../services/authGuard/supplier.guard';

// Define the routes for navigation
const routes: Routes = [
  // Public routes accessible without authentication
  { path: 'login', component: LoginComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: 'homepage', component: HomepageComponent },
  // Protected routes accessible only with specific roles
  { path: 'dashboard', component: DashbaordComponent },
  { path: 'createhospital', component: CreatehospitalComponent, canActivate: [HospitalGuard] },
  { path: 'schedule-maintenance', component: ScheduleMaintenanceComponent, canActivate: [HospitalGuard] },
  { path: 'requestequipment', component: RequestequipmentComponent, canActivate: [HospitalGuard] },
  { path: 'maintenance', component: MaintenanceComponent, canActivate: [TechnicianGuard] },
  { path: 'orders', component: OrdersComponent, canActivate: [SupplierGuard] },
  // Redirect to homepage for the root path and unmatched routes
  { path: '', redirectTo: '/homepage', pathMatch: 'full' },
  { path: '**', redirectTo: '/dashboard', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
