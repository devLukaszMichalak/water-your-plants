import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDeleteModalComponent } from './plant-delete-modal.component';

describe('PlantDeleteModalComponent', () => {
  let component: PlantDeleteModalComponent;
  let fixture: ComponentFixture<PlantDeleteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantDeleteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
