import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleAssistanceComponent } from './vehicle-assistance.component';

describe('VehicleAssistanceComponent', () => {
  let component: VehicleAssistanceComponent;
  let fixture: ComponentFixture<VehicleAssistanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehicleAssistanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehicleAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
