import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionProgramFormComponent } from './extension-program-form.component';

describe('ExtensionProgramFormComponent', () => {
  let component: ExtensionProgramFormComponent;
  let fixture: ComponentFixture<ExtensionProgramFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionProgramFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionProgramFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
