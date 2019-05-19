import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  formData: Employee;

  constructor(private _firestore: AngularFirestore) { }

  getemployees(){
    return this._firestore.collection('employees').snapshotChanges();
  }
}
