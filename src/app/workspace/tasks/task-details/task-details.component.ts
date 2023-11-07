import { Component, Input } from '@angular/core';
import { ITaskDetailed } from 'src/interfaces/interfaces';
// Initialization for ES Users
import { Collapse, Ripple, initTE } from 'tw-elements';

initTE({ Collapse, Ripple });
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent {
  showModalDetails: boolean = true;
  @Input() task!: ITaskDetailed;

  constructor() {}
  ngOnInit() {
    console.log(this.task);
    initTE({ Collapse, Ripple });
  }

  closeModal() {
    this.showModalDetails = !this.showModalDetails;
  }
  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}
