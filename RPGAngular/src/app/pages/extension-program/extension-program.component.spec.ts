import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtensionProgramComponent } from './extension-program.component';

describe('ExtensionProgramComponent', () => {
  let component: ExtensionProgramComponent;
  let fixture: ComponentFixture<ExtensionProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtensionProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtensionProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
