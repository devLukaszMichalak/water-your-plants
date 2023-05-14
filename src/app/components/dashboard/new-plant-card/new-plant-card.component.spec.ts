import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPlantCardComponent } from './new-plant-card.component';

describe('NewPlantCardComponent', () => {
  let component: NewPlantCardComponent;
  let fixture: ComponentFixture<NewPlantCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPlantCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewPlantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
