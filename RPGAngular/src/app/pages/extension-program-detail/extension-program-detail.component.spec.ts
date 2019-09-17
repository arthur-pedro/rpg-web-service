import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionProgramDetailComponent } from './extension-program-detail.component';

describe('ExtensionProgramDetailComponent', () => {
  let component: ExtensionProgramDetailComponent;
  let fixture: ComponentFixture<ExtensionProgramDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionProgramDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionProgramDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
