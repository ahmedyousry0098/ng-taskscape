import { Component } from '@angular/core';
import { IoService } from 'src/app/services/io.service';

@Component({
  selector: 'app-workspace-layout',
  templateUrl: './workspace-layout.component.html',
  styleUrls: ['./workspace-layout.component.css']
})
export class WorkspaceLayoutComponent {
  constructor(private _IoService: IoService) {}

  ngOnInit() {
    this._IoService.stablishSocketId()
    this._IoService.listenToPushNew()
  }
}
