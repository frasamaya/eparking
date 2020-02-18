import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TambahkendaraanPage } from './tambahkendaraan.page';

describe('TambahkendaraanPage', () => {
  let component: TambahkendaraanPage;
  let fixture: ComponentFixture<TambahkendaraanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TambahkendaraanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TambahkendaraanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
