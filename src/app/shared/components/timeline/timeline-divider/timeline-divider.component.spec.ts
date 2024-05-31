import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimelineDividerComponent } from './timeline-divider.component';

describe('TimelineDividerComponent', () => {
  let component: TimelineDividerComponent;
  let fixture: ComponentFixture<TimelineDividerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimelineDividerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimelineDividerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
