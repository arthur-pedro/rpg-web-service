import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerQuestComponent } from './manager-quest.component';

describe('ManagerQuestComponent', () => {
  let component: ManagerQuestComponent;
  let fixture: ComponentFixture<ManagerQuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerQuestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerQuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
