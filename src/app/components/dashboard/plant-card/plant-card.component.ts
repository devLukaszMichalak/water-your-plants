import { Component, inject, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Plant } from '../../../services/plant/plant';
import { PlantEditModalComponent } from './plant-edit-modal/plant-edit-modal.component';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent {
  
  @Input()
  public plant: Plant | null = null;
  
  private modalService = inject(NgbModal);
  
  openPlantEdit(): void {
    const modalRef = this.modalService.open(PlantEditModalComponent,
      {
        backdrop: 'static',
        centered: true
      });
    
    modalRef.componentInstance.plant = this.plant;
  }
}
