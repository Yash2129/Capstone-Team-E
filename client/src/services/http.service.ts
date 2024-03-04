import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../environments/environment.development';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  public serverName = environment.apiUrl;  // To get server name

  constructor(private http: HttpClient, private authService: AuthService) {}

  private handleError(error: any): Observable<never> {
    let errorMessage = 'An error occurred.';
    if (error.error && error.error.message) {
      errorMessage = error.error.message;
    }
    return throwError(errorMessage);
  }

  UpdateOrderStatus(newStatus: any, orderId: any): Observable<any> {
    return this.http.put<any>(this.serverName+'/api/supplier/order/update/'+orderId+'?newStatus='+newStatus,{})
      .pipe(catchError(this.handleError));
  }

  addEquipment(details: any, hospitalId: any): Observable<any> {
    return this.http.post<any>(
      `${this.serverName}/api/hospital/equipment?hospitalId=${hospitalId}`,
      details
    ).pipe(catchError(this.handleError));
  }

  getorders(): Observable<any> {
    return this.http.get(`${this.serverName}/api/supplier/orders`).pipe(catchError(this.handleError));
  }

  getMaintenance(): Observable<any> {
    return this.http.get(`${this.serverName}/api/technician/maintenance`).pipe(catchError(this.handleError));
  }

  getHospital(): Observable<any> {
    return this.http.get(`${this.serverName}/api/hospitals`).pipe(catchError(this.handleError));
  }

  getEquipmentById(id: any): Observable<any> {
    return this.http.get(`${this.serverName}/api/hospital/equipment/${id}`).pipe(catchError(this.handleError));
  }

  updateMaintenance(details: any, maintenanceId: any): Observable<any> {
    return this.http.put(`${this.serverName}/api/technician/maintenance/update/${maintenanceId}`, details).pipe(catchError(this.handleError));
  }

  orderEquipment(details: any, equipmentId: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/hospital/order?equipmentId=${equipmentId}`, details).pipe(catchError(this.handleError));
  }

  scheduleMaintenance(details: any, equipmentId: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/hospital/maintenance/schedule?equipmentId=${equipmentId}`, details).pipe(catchError(this.handleError));
  }

  createHospital(details: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/hospital/create`, details).pipe(catchError(this.handleError));
  }

  Login(details: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/user/login`, details).pipe(catchError(this.handleError));
  }

  // To check if the username is already exist on the database
  checkUsernameExists(username: String): Observable<boolean> {
    return this.http.get<boolean>(this.serverName+'/checkUsername?username='+username);
  }

  registerUser(details: any): Observable<any> {
    return this.http.post(`${this.serverName}/api/user/register`, details).pipe(catchError(this.handleError));
  }
}
