import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedColorComponent } from './approved-color.component';

describe('ApprovedColorComponent', () => {
  let component: ApprovedColorComponent;
  let fixture: ComponentFixture<ApprovedColorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApprovedColorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovedColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
