import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileThingComponent } from './profile-thing.component';

describe('ProfileThingComponent', () => {
  let component: ProfileThingComponent;
  let fixture: ComponentFixture<ProfileThingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileThingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileThingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
