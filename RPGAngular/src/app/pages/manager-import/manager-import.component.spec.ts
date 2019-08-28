import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerImportComponent } from './manager-import.component';

describe('ManagerImportComponent', () => {
  let component: ManagerImportComponent;
  let fixture: ComponentFixture<ManagerImportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerImportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerImportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
