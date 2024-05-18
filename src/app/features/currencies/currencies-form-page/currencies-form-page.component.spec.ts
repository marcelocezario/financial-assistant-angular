import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesFormPageComponent } from './currencies-form-page.component';

describe('CurrenciesFormPageComponent', () => {
  let component: CurrenciesFormPageComponent;
  let fixture: ComponentFixture<CurrenciesFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrenciesFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrenciesFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
