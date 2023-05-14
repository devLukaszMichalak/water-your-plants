import {Component} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-plant-creator-modal',
  templateUrl: './plant-creator-modal.component.html',
  styleUrls: ['./plant-creator-modal.component.scss']
})
export class PlantCreatorModalComponent {

  constructor(public activeModal: NgbActiveModal) {
  }

  close() {
    this.activeModal.close('Close click');
  }

  dismiss() {
    this.activeModal.dismiss('Cross click');
  }
}
