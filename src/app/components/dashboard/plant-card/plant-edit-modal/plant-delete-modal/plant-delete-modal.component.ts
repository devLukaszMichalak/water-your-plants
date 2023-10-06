import { Component, inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Plant } from '../../../../../services/plant/plant';
import { PlantService } from '../../../../../services/plant/plant.service';

@Component({
  selector: 'app-plant-delete-modal',
  templateUrl: './plant-delete-modal.component.html',
  styleUrls: ['./plant-delete-modal.component.scss']
})
export class PlantDeleteModalComponent {
  
  public activeModal = inject(NgbActiveModal);
  public plantService = inject(PlantService);
  
  public plant: Plant | null = null;
  
  delete() {
    this.plantService.deletePlant(this.plant!).then(() => {
      this.activeModal.close(true);
    });
  }
  
  dismiss() {
    this.activeModal.close(false);
  }
}
