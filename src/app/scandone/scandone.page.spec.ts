import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScandonePage } from './scandone.page';

describe('ScandonePage', () => {
  let component: ScandonePage;
  let fixture: ComponentFixture<ScandonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScandonePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScandonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
