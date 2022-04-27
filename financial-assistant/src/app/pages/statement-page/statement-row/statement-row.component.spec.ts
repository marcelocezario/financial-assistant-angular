import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatementRowComponent } from './statement-row.component';

describe('StatementRowComponent', () => {
  let component: StatementRowComponent;
  let fixture: ComponentFixture<StatementRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatementRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatementRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
