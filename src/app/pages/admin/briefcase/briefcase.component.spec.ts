import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BriefcaseComponent } from './briefcase.component';

describe('BriefcaseComponent', () => {
  let component: BriefcaseComponent;
  let fixture: ComponentFixture<BriefcaseComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BriefcaseComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BriefcaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
