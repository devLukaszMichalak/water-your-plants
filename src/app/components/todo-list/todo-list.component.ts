import {Component, inject} from '@angular/core';
import {combineLatest, Observable, switchMap} from "rxjs";
import {PlantService} from "../../services/plant/plant.service";
import {User} from "@firebase/auth";
import {AuthService} from "../../services/auth/auth.service";
import {WateringService} from "../../services/watering/watering.service";
import {Watering} from "../../services/watering/watering";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  private currentUser: User = inject(AuthService).getCurrentUser();
  private wateringService: WateringService = inject(WateringService);

  waterings$: Observable<Watering[]> = inject(PlantService)
    .getPlantsToWater(this.currentUser.email!, this.getCurrentDay())
    .pipe(
      switchMap(plantsToWater => {
        return combineLatest(plantsToWater.map(plant =>
          this.wateringService.getWateringOfPlant(plant, this.getCurrentDate())
        ));
      }));

  private getCurrentDay(): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDateIndex = new Date().getDay();
    return daysOfWeek[currentDateIndex];
  }

  setPlantWateringValue(watering: Watering) {
    this.wateringService.updateWateringStatus(
      new Watering(
        watering.id,
        watering.plantName,
        this.getCurrentDate(),
        !watering.wasWatered,
        watering.plantId
      )
    ).then()
  }

  private getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
