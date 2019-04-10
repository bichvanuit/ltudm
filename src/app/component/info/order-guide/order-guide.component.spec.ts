import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderGuideComponent } from './order-guide.component';

describe('OrderGuideComponent', () => {
  let component: OrderGuideComponent;
  let fixture: ComponentFixture<OrderGuideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderGuideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
