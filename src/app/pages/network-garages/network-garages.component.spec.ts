import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkGaragesComponent } from './network-garages.component';

describe('NetworkGaragesComponent', () => {
  let component: NetworkGaragesComponent;
  let fixture: ComponentFixture<NetworkGaragesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NetworkGaragesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NetworkGaragesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
