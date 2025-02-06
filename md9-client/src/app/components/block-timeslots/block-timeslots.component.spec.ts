import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTimeslotsComponent } from './block-timeslots.component';

describe('BlockTimeslotsComponent', () => {
  let component: BlockTimeslotsComponent;
  let fixture: ComponentFixture<BlockTimeslotsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlockTimeslotsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlockTimeslotsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
