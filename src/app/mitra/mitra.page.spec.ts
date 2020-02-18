import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MitraPage } from './mitra.page';

describe('MitraPage', () => {
  let component: MitraPage;
  let fixture: ComponentFixture<MitraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MitraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MitraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
