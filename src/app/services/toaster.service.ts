import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  constructor(private matsnackbar: MatSnackBar) { }

  error(message: string) {
    this.matsnackbar.open(message, 'close', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'left'      
    })
  }
}
