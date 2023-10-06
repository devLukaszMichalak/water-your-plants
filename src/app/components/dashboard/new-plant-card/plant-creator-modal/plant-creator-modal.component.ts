import {Component, inject} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlantService} from "../../../../services/plant/plant.service";
import {Plant} from "../../../../services/plant/plant";
import {User} from "@firebase/auth";
import {AuthService} from "../../../../services/auth/auth.service";
import { ImageService } from '../../../../services/image/image.service';

@Component({
  selector: 'app-plant-creator-modal',
  templateUrl: './plant-creator-modal.component.html',
  styleUrls: ['./plant-creator-modal.component.scss']
})
export class PlantCreatorModalComponent {

  private activeModal = inject(NgbActiveModal)
  private plantService = inject(PlantService)
  private imageService = inject(ImageService)
  private currentUser: User = inject(AuthService).getCurrentUser();

  public isSaving: boolean = false;
  public imageFilename: string = 'Photo of a plant';

  private imageFile?: File;

  newPlantForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      waterOnMonday: new FormControl(false, [Validators.required]),
      waterOnTuesday: new FormControl(false, [Validators.required]),
      waterOnWednesday: new FormControl(false, [Validators.required]),
      waterOnThursday: new FormControl(false, [Validators.required]),
      waterOnFriday: new FormControl(false, [Validators.required]),
      waterOnSaturday: new FormControl(false, [Validators.required]),
      waterOnSunday: new FormControl(false, [Validators.required])
    },
    {}
  );

  async save() {
    this.isSaving = true;
    let imageFileBase64 = null;
    
    if (this.imageFile) {
      try {
        imageFileBase64 = await this.imageService.resizeAndConvertFileToBase64(this.imageFile);
        if (imageFileBase64.length >= 1048487) {
          console.log('Image is too big!')
          this.isSaving = false;
          return;
        }
      } catch (ignored) {
      }
    }

    const plant: Plant = new Plant(
      null,
      this.newPlantForm.value.name!,
      this.currentUser.email!,
      !!this.newPlantForm.value.waterOnMonday,
      !!this.newPlantForm.value.waterOnTuesday,
      !!this.newPlantForm.value.waterOnWednesday,
      !!this.newPlantForm.value.waterOnThursday,
      !!this.newPlantForm.value.waterOnFriday,
      !!this.newPlantForm.value.waterOnSaturday,
      !!this.newPlantForm.value.waterOnSunday,
      imageFileBase64
    );

    this.plantService.savePlant(plant).then(() => {
      this.activeModal.close(true);
    })

  }

  dismiss() {
    this.activeModal.close(false);
  }

  getFile = (): void => document.getElementById('formFile')!.click();

  uploadFile($event: any) {
    const file: File = $event.target.files[0];
    this.imageFilename = file.name;
    this.imageFile = file;
  }

}
