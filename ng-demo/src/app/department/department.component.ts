import { Component } from '@angular/core';
import { Department } from '../model/department.model';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent {

  id_=0;

  isUpdate=false;
  updateId=0;

  departmentHidden=true;
  departments=new Array<Department>();
  name=new FormControl();

  constructor() {}
  
  addDepartment() {
    let department=new Department()
    department.name=this.name.value;

    if(this.isUpdate) {
      department.id=this.updateId;

      let index=this.departments.findIndex(dept => dept.id==this.updateId)
      this.departments[index]=department;
    } else {
      department.id=this.id_++;
      this.departments.push(department);
    }

    this.name.setValue('')
  }

  viewDepartments() {
    this.departmentHidden=!this.departmentHidden;
  }

  delete(department:Department,index:number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Deleted!','Your file has been deleted.', 'success' )
        this.departments.splice(index,1)
      }
    })
  }

  update(department:Department) {
    this.isUpdate=true;
    this.updateId=department.id
    this.name.setValue(department.name)
      
  }


  onOtpChange(event:string) {

  }


}
