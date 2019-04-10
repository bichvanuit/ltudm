import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckShippingComponent } from './check-shipping.component';

describe('CheckShippingComponent', () => {
  let component: CheckShippingComponent;
  let fixture: ComponentFixture<CheckShippingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckShippingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckShippingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
