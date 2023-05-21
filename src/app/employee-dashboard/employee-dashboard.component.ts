import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-dashboard.model';
import { ApiService } from '../shared/api.service'

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeGet: any;
  showAdd !: boolean;
  showUpdate !: boolean;



  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobileNo: [''],
      salary: ['']
    })

    this.getAllEmployee()
  }

  clickAddEmployee() {
    this.formValue.reset()
    this.showAdd = true;
    this.showUpdate = false
  }

  postEmployeeDetail() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobileNo = this.formValue.value.mobileNo;
    this.employeeModelObj.salary = this.formValue.value.salary;


    this.api.postEmployee(this.employeeModelObj).subscribe({
      next: (res) => {
        alert('Add Employee Succesfulll')
        this.formValue.reset()
        const ref = document.getElementById('cancel')
        ref?.click()
        this.getAllEmployee()
      },
      error: () => {
        alert('error')
      }
    })
  }


  getAllEmployee() {
    this.api.getEmployee().subscribe({
      next: (res) => {
        this.employeeGet = res;
      },
      error: () => {
        alert("Get error")
      }
    })
  }

  deletesEmployee(row: number) {
    this.api.deleteEmployee(row).subscribe({
      next: (res) => {
        alert('Employee Deleted')
        this.getAllEmployee()
      }
    })
  }


  editEmployee(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName)
    this.formValue.controls['lastName'].setValue(row.lastName)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['mobileNo'].setValue(row.mobileNo)
    this.formValue.controls['salary'].setValue(row.salary)
  }

  updateEmployeeDetail() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.email = this.formValue.value.email;
    this.employeeModelObj.mobileNo = this.formValue.value.mobileNo;
    this.employeeModelObj.salary = this.formValue.value.salary;

    this.api.updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe({
        next: (res) => {
          alert('Update Employee Succesfulll')
          this.formValue.reset()
          const ref = document.getElementById('cancel')
          ref?.click()
          this.getAllEmployee()
        },
        error: () => {
          alert('Errr')
        }
      })
  }


}
