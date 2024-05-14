import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesFormPageComponent } from './categories-form-page.component';

describe('CategoriesFormPageComponent', () => {
  let component: CategoriesFormPageComponent;
  let fixture: ComponentFixture<CategoriesFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
