import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { WorkspaceModule } from './workspace/workspace.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    HomeModule,
    SharedModule,
    RouterModule,
    WorkspaceModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
