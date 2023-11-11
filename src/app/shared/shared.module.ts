import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [NotfoundComponent, NavbarComponent, FooterComponent],
  imports: [CommonModule, RouterModule, DialogModule],
  exports: [NotfoundComponent, NavbarComponent, FooterComponent],
})
export class SharedModule {}
