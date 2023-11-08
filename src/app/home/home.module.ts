import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [HeaderComponent, LayoutComponent],
    exports: [HeaderComponent, LayoutComponent],
    imports: [CommonModule, RouterModule, SharedModule]
})

export class HomeModule { }