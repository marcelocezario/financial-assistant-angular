import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletsFormPageComponent } from './wallets-form-page.component';

describe('WalletsFormPageComponent', () => {
  let component: WalletsFormPageComponent;
  let fixture: ComponentFixture<WalletsFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WalletsFormPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WalletsFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
