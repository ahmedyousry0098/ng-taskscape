import { IEmployee } from './../../../interfaces/interfaces';
import { formatPercent } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { EmployeeService } from 'src/services/employee.service';
@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
})
export class ProjectsComponent {
  employees?: IEmployee[];
  selectedEmployees?: IEmployee[];

  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: EmployeeService
  ) {}
  showModal = false;
  toggleModal() {
    this.showModal = !this.showModal;
  }
  addNewProjectForm = this.formBuilder.group({
    projectName: ['', [Validators.required]],
    startDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    projectDescription: ['', [Validators.required]],
    selectedEmployees: ['', [Validators.required]],
  });
  onSubmit(): void {
    this.isSubmitted = true;
    if (this.addNewProjectForm.valid) {
      console.log('formData', this.addNewProjectForm.value);
    }
  }
  addProjectErrorMsgs(inputName: any) {
    (this.addNewProjectForm.get(inputName)?.invalid &&
      this.addNewProjectForm.get(inputName)?.touched) ||
      this.addNewProjectForm.get(inputName)?.dirty ||
      this.isSubmitted;
  }
  ngOnInit() {
    this.userService.getAllUsers().subscribe(({ employee }) => {
      this.employees = employee;
      console.log(this.employees);
    });
  }
}
