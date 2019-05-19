import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  list: Employee[];
  constructor(private _services: EmployeeService,
    private _firestore: AngularFirestore,
    private _toastr:ToastrService) { }

  ngOnInit() {
    this._services.getemployees().subscribe(res => {
      this.list = res.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Employee;
      })
    });
  }

  onEditFunc(emp) {
    this._services.formData = Object.assign({}, emp);
  }

  onDeleteFunc(id:string){
    if(confirm("Are You Sure!?")){
      this._firestore.doc('employees/'+id).delete();
      this._toastr.error("Deleted Successfully!","EMP. Register");
    }
  }
}
