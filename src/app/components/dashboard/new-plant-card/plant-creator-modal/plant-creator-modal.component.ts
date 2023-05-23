import {Component, inject} from '@angular/core';
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PlantService} from "../../../../services/plant/plant.service";
import {Plant} from "../../../../services/plant/plant";
import {User} from "@firebase/auth";
import {AuthService} from "../../../../services/auth/auth.service";

@Component({
  selector: 'app-plant-creator-modal',
  templateUrl: './plant-creator-modal.component.html',
  styleUrls: ['./plant-creator-modal.component.scss']
})
export class PlantCreatorModalComponent {

  public activeModal = inject(NgbActiveModal)
  public plantService = inject(PlantService)
  private currentUser: User = inject(AuthService).getCurrentUser();

  public isSaving: boolean = false;
  public imageFilename: string = 'Photo of a plant';

  private imageFile?: File;

  newPlantForm = new FormGroup(
    {
      name: new FormControl('', [Validators.required]),
      waterPerDay: new FormControl('', [Validators.required]),
      waterPerWeek: new FormControl('', [Validators.required])
    },
    {}
  );

  async save() {
    this.isSaving = true;
    let imageFileBase64;
    try {
      imageFileBase64 = await this.resizeAndConvertFileToBase64(this.imageFile!, 1000, 1000);
      if (imageFileBase64.length >= 1048487) {
        console.log('img too big')
        this.isSaving = false;
        return;
      }
    } catch (ignored) {
      imageFileBase64 = null;
    }

    const plant: Plant = new Plant(
      this.newPlantForm.value.name!,
      this.currentUser.email!,
      +this.newPlantForm.value.waterPerDay!,
      +this.newPlantForm.value.waterPerWeek!,
      imageFileBase64,
      null
    );

    this.plantService.savePlant(plant).then(() => {
      this.activeModal.close('Close click');
    })

  }

  dismiss() {
    this.activeModal.dismiss('Cross click');
  }

  getFile = (): void => document.getElementById('formFile')!.click();

  uploadFile($event: any) {
    const file: File = $event.target.files[0];
    this.imageFilename = file.name;
    this.imageFile = file;
  }

  private resizeAndConvertFileToBase64(file: File, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;
          if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
          }
          if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
          }

          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          canvas.width = width;
          canvas.height = height;

          ctx?.drawImage(img, 0, 0, width, height);

          const base64String = canvas.toDataURL(file.type);

          resolve(base64String);
        };

        img.src = reader.result as string;
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  }

}
