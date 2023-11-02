import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SprintService } from 'src/app/services/sprint.service';

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
})
export class SprintComponent {
  isLoading: boolean = false;
  createSprint: FormGroup;

  constructor(sprintService: SprintService, private formBuilder: FormBuilder) {
    this.createSprint = this.formBuilder.group({
      sprintName: [[Validators.required, Validators.minLength(5)]],
      sprintDate: [[Validators.required, Validators.d]],
    });
  }

  handleCreateSprint() {
    this.isLoading = true;
  }
}
