import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [NotfoundComponent, NavbarComponent, FooterComponent],
  imports: [CommonModule],
  exports: [NotfoundComponent, NavbarComponent, FooterComponent]
})

export class SharedModule { }