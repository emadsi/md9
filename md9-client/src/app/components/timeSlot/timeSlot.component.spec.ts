import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeSlotComponent } from './timeSlot.component';

describe('TimeSlotComponent', () => {
  let component: TimeSlotComponent;
  let fixture: ComponentFixture<TimeSlotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TimeSlotComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimeSlotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
