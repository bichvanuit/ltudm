import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeeMoreProductComponent } from './see-more-product.component';

describe('SeeMoreProductComponent', () => {
  let component: SeeMoreProductComponent;
  let fixture: ComponentFixture<SeeMoreProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeeMoreProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeeMoreProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
