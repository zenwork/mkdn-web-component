import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MdStoryComponent } from './md-story.component';

describe('MdStoryComponent', () => {
  let component: MdStoryComponent;
  let fixture: ComponentFixture<MdStoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MdStoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MdStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
