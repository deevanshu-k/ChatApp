import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificRoomComponent } from './specific-room.component';

describe('SpecificRoomComponent', () => {
  let component: SpecificRoomComponent;
  let fixture: ComponentFixture<SpecificRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecificRoomComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
