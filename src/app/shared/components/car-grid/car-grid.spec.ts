import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarGrid } from './car-grid';

describe('CarGrid', () => {
  let component: CarGrid;
  let fixture: ComponentFixture<CarGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
