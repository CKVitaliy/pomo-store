import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOneProductComponent } from './edit-one-product.component';

describe('EditOneProductComponent', () => {
  let component: EditOneProductComponent;
  let fixture: ComponentFixture<EditOneProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOneProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOneProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
