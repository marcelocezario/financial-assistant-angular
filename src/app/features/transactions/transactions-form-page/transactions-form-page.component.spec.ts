import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionsFormPageComponent } from './transactions-form-page.component';

describe('TransactionsFormPageComponent', () => {
  let component: TransactionsFormPageComponent;
  let fixture: ComponentFixture<TransactionsFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionsFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TransactionsFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
