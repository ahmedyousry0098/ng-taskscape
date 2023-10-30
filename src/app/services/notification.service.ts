import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationMessageComponent } from '../workspace/settings/notification-message/notification-message.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private snackBar: MatSnackBar) {}
  showNotification(
    displayMessage: string,
    buttonText: string,
    messageType: 'error' | 'success'
  ) {
    this.snackBar.openFromComponent(NotificationMessageComponent, {
      data: {
        message: displayMessage,
        buttonText: buttonText,
        type: messageType,
      },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: messageType,
    });
  }
}
