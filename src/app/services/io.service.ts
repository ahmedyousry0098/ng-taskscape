import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io } from "socket.io-client";
import {DEV_ENV, PROD_ENV} from '../environment/environment'
import { INotification } from 'src/interfaces/notification.interface';
import { ToasterService } from './toaster.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IoService {

  user_Id = this._AuthService.getDecodedToken()
  public message$: BehaviorSubject<string> = new BehaviorSubject('');
  public notifications$ = new BehaviorSubject<INotification[]|null>(null)
  public Io = io(`${PROD_ENV.BaseURL}`)
  constructor(
    private _Toaster: ToasterService,
    private _AuthService: AuthService
  ) { 
    this.listenToNotifications()
  }

  getNotifications() {
    return this.notifications$.asObservable()
  }
  
  stablishSocketId() {
    const token = this._AuthService.getToken()
    this.Io.emit('updateSocketId', {token})
  }

  fetchNotifications() {
    this.Io.emit('fetchNotifications', {_id: this.user_Id})
  }

  listenToNotifications() {
    this.Io.on('listenToNotificatons', (data: {myNotifications: INotification[]}) => {
      this.notifications$.next(data.myNotifications)
    })
  }

  readNotifications() {
    this.Io.emit('markNotificationsRead', {_id: this.user_Id})
  }

  listenToPushNew() {
    this.Io.on('pushNew', ({msg}) => {
      this._Toaster.success(msg)
      this.fetchNotifications()
    })
  }
}
