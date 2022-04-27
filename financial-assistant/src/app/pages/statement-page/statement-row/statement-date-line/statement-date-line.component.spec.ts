import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementDateLineComponent } from './statement-date-line.component';

describe('StatementDateLineComponent', () => {
  let component: StatementDateLineComponent;
  let fixture: ComponentFixture<StatementDateLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementDateLineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementDateLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
