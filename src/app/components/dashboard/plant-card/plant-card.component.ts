import { Component, inject, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlantDeleteModalComponent } from './plant-delete-modal/plant-delete-modal.component';
import { Plant } from '../../../services/plant/plant';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent {
  
  @Input()
  public plant: Plant | null = null;
  
  private modalService = inject(NgbModal);
  
  openPlantDelete(): void {
    const modalRef = this.modalService.open(PlantDeleteModalComponent,
      {
        backdrop: 'static',
        centered: true
      });
    
    modalRef.componentInstance.plant = this.plant;
  }
}
