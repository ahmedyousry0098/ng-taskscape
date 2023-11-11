import { Component } from '@angular/core';
import { IoService } from '../../services/io.service';
import {BehaviorSubject} from 'rxjs'
import { INotification } from 'src/interfaces/notification.interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {
  constructor(private _IoService: IoService) {}
  
  notifications: INotification[]|null = null
  ngOnInit() {}
}
