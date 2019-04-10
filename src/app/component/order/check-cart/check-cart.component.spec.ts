import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckCartComponent } from './check-cart.component';

describe('CheckCartComponent', () => {
  let component: CheckCartComponent;
  let fixture: ComponentFixture<CheckCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
