import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryStatementComponent } from './entry-statement.component';

describe('EntryStatementComponent', () => {
  let component: EntryStatementComponent;
  let fixture: ComponentFixture<EntryStatementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryStatementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryStatementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
