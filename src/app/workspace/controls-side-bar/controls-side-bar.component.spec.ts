import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsSideBarComponent } from './controls-side-bar.component';

describe('ControlsSideBarComponent', () => {
  let component: ControlsSideBarComponent;
  let fixture: ComponentFixture<ControlsSideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ControlsSideBarComponent]
    });
    fixture = TestBed.createComponent(ControlsSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
