import { Component, inject } from '@angular/core';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {PlantCreatorModalComponent} from "./plant-creator-modal/plant-creator-modal.component";

@Component({
  selector: 'app-new-plant-card',
  templateUrl: './new-plant-card.component.html',
  styleUrls: ['./new-plant-card.component.scss']
})
export class NewPlantCardComponent {

  private modalService = inject(NgbModal);

  openPlantCreator(): void {
    const modalRef = this.modalService.open(PlantCreatorModalComponent,
      {
        backdrop: 'static',
        centered: true
      });
  }
}
