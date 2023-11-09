import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITaskDetailed, ITaskUpdate } from 'src/interfaces/interfaces';

@Component({
  selector: 'app-confirmation-change-status',
  templateUrl: './confirmation-change-status.component.html',
  styleUrls: ['./confirmation-change-status.component.css'],
})
export class ConfirmationChangeStatusComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { task: ITaskDetailed; newStatus: ITaskUpdate },
    private dialogRef: MatDialogRef<ConfirmationChangeStatusComponent>
  ) {}

  confirm() {
    this.dialogRef.close('confirm');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}
