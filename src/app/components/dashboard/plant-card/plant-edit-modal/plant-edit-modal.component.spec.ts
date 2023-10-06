import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantEditModalComponent } from './plant-edit-modal.component';

describe('PlantEditModalComponent', () => {
  let component: PlantEditModalComponent;
  let fixture: ComponentFixture<PlantEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantEditModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
