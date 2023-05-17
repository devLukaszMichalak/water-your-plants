import {Component, inject} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-plant-creator-modal',
  templateUrl: './plant-creator-modal.component.html',
  styleUrls: ['./plant-creator-modal.component.scss']
})
export class PlantCreatorModalComponent {

  public activeModal = inject(NgbActiveModal)

  imageFilename: string = 'Photo of a plant';

  newPlantForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      waterPerDay: new FormControl('', [Validators.required]),
      waterPerWeek: new FormControl('', [Validators.required])
    },
    {}
  );

  save() {
    //todo save plant to db
    this.activeModal.close('Close click');
  }

  dismiss() {
    this.activeModal.dismiss('Cross click');
  }

  getFile = (): void => document.getElementById('formFile')!.click();

  uploadFile($event: any) {
    const file: File = $event.target.files[0];
    this.imageFilename = file.name
  }
}
