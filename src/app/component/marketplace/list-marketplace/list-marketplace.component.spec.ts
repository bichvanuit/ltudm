import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMarketplaceComponent } from './list-marketplace.component';

describe('ListMarketplaceComponent', () => {
  let component: ListMarketplaceComponent;
  let fixture: ComponentFixture<ListMarketplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMarketplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
