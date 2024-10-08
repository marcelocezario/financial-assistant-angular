import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrenciesPageComponent } from './currencies-page.component';

describe('CurrenciesPageComponent', () => {
  let component: CurrenciesPageComponent;
  let fixture: ComponentFixture<CurrenciesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrenciesPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrenciesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
