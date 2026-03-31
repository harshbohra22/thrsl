import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartListComponent } from './part-list';

describe('PartListComponent', () => {
  let component: PartListComponent;
  let fixture: ComponentFixture<PartListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PartListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
