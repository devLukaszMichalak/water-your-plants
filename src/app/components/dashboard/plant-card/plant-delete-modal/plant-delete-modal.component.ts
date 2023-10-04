import { Component, inject } from '@angular/core';
import { Plant } from '../../../../services/plant/plant';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PlantService } from '../../../../services/plant/plant.service';

@Component({
  selector: 'app-plant-delete-modal',
  templateUrl: './plant-delete-modal.component.html',
  styleUrls: ['./plant-delete-modal.component.scss']
})
export class PlantDeleteModalComponent {
  
  public activeModal = inject(NgbActiveModal);
  public plantService = inject(PlantService);
  
  public plant: Plant | null = null;
  
  public isSaving: boolean = false;
  
  delete() {
    this.plantService.deletePlant(this.plant!).then(() => {
      this.activeModal.close('Close click');
    });
  }
  
  dismiss() {
    this.activeModal.dismiss('Cross click');
  }
}
