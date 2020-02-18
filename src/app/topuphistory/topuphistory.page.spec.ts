import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopuphistoryPage } from './topuphistory.page';

describe('TopuphistoryPage', () => {
  let component: TopuphistoryPage;
  let fixture: ComponentFixture<TopuphistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopuphistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopuphistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
