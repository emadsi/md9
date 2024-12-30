import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationNumberComponent } from './confirmation-number.component';

describe('ConfirmationNumberComponent', () => {
  let component: ConfirmationNumberComponent;
  let fixture: ComponentFixture<ConfirmationNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmationNumberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
