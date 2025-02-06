import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTimeslotsComponent } from './add-timeslots.component';

describe('AddTimeslotsComponent', () => {
  let component: AddTimeslotsComponent;
  let fixture: ComponentFixture<AddTimeslotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddTimeslotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
