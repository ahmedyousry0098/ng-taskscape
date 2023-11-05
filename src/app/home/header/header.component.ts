import { Component, ElementRef, Renderer2, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  firstScroll = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.triggerTxtAnimation();
    this.triggerImageAnimation();
  }
  
  triggerTxtAnimation() {
    const element = this.elementRef.nativeElement.querySelector('.header-text');
    this.renderer.addClass(element, 'animate__animated');
    this.renderer.addClass(element, 'animate__backInLeft');
  }
  triggerImageAnimation() {
    const element = this.elementRef.nativeElement.querySelector('.header-img');
    this.renderer.addClass(element, 'animate__animated');
    this.renderer.addClass(element, 'animate__backInRight');
  }
}
