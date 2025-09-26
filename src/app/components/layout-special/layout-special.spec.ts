import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSpecial } from './layout-special';

describe('LayoutSpecial', () => {
  let component: LayoutSpecial;
  let fixture: ComponentFixture<LayoutSpecial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSpecial]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutSpecial);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
