import { Component, inject, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlantService } from '../../../../services/plant/plant.service';
import { ImageService } from '../../../../services/image/image.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Plant } from '../../../../services/plant/plant';
import { PlantDeleteModalComponent } from './plant-delete-modal/plant-delete-modal.component';

@Component({
  selector: 'app-plant-edit-modal',
  templateUrl: './plant-edit-modal.component.html',
  styleUrls: ['./plant-edit-modal.component.scss']
})
export class PlantEditModalComponent implements OnInit {
  
  private activeModal = inject(NgbActiveModal)
  private plantService = inject(PlantService)
  private imageService = inject(ImageService)
  private modalService = inject(NgbModal);
  
  public plant: Plant | null = null;
  
  public isSaving: boolean = false;
  public imageFilename: string = 'Photo of a plant';
  
  private imageFile?: File;
  
  editPlantForm = new FormGroup(
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
  
  ngOnInit() {
    if (this.plant) {
      this.editPlantForm.controls['waterOnMonday'].setValue(this.plant.waterOnMonday)
      this.editPlantForm.controls['waterOnTuesday'].setValue(this.plant.waterOnTuesday)
      this.editPlantForm.controls['waterOnWednesday'].setValue(this.plant.waterOnWednesday)
      this.editPlantForm.controls['waterOnThursday'].setValue(this.plant.waterOnThursday)
      this.editPlantForm.controls['waterOnFriday'].setValue(this.plant.waterOnFriday)
      this.editPlantForm.controls['waterOnSaturday'].setValue(this.plant.waterOnSaturday)
      this.editPlantForm.controls['waterOnSunday'].setValue(this.plant.waterOnSunday)
      this.editPlantForm.controls['name'].setValue(this.plant.name)
    }
  }
  
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
      this.plant?.id!,
      this.editPlantForm.value.name!,
      this.plant?.owner!,
      !!this.editPlantForm.value.waterOnMonday,
      !!this.editPlantForm.value.waterOnTuesday,
      !!this.editPlantForm.value.waterOnWednesday,
      !!this.editPlantForm.value.waterOnThursday,
      !!this.editPlantForm.value.waterOnFriday,
      !!this.editPlantForm.value.waterOnSaturday,
      !!this.editPlantForm.value.waterOnSunday,
      imageFileBase64
    );
    
    this.plantService.updatePlant(plant).then(() => {
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
    this.editPlantForm.markAsDirty()
  }
  
  openPlantDelete(): void {
    const modalRef = this.modalService.open(PlantDeleteModalComponent,
      {
        backdrop: 'static',
        centered: true
      });
    
    modalRef.componentInstance.plant = this.plant;
    
    modalRef.result.then(wasDeleted => {
      if (wasDeleted) {
        this.dismiss();
      }
    })
  }
}
