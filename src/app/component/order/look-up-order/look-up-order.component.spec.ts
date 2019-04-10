import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookUpOrderComponent } from './look-up-order.component';

describe('LookUpOrderComponent', () => {
  let component: LookUpOrderComponent;
  let fixture: ComponentFixture<LookUpOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookUpOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookUpOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
