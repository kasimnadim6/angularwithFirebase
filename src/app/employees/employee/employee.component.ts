import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { FirebaseFirestore } from '@angular/fire';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(private _service: EmployeeService,
    private _firestore: AngularFirestore,
    private _toastr: ToastrService) { }
    

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this._service.formData = {
      id: null,
      fullName: '',
      position: '',
      empCode: '',
      mobile: '',
    }
  }

  onSubmitFunc(form: NgForm) {
    let data = Object.assign({}, form.value);
    delete data.id;

    if (form.value.id == null) {
      this._firestore.collection('employees').add(data);
      this._toastr.success('Submitted Succesfully!', 'EMP. Register');
      this.resetForm(form);
    }
    else {
      this._firestore.doc('employees/' + form.value.id).update(data);
      this._toastr.info('Updated Succesfully!', 'EMP. Register');
      this.resetForm(form);
    }
  }
}
