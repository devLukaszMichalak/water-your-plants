import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantCreatorModalComponent } from './plant-creator-modal.component';

describe('PlantCreatorComponent', () => {
  let component: PlantCreatorModalComponent;
  let fixture: ComponentFixture<PlantCreatorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantCreatorModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantCreatorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
