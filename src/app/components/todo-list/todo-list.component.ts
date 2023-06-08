import {Component, inject, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Plant} from "../../services/plant/plant";
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

  plantsToWater$: Observable<Plant[]> = inject(PlantService).getPlantsToWater(this.currentUser.email!, this.getCurrentDay())

  private getCurrentDay(): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDateIndex = new Date().getDay();
    return daysOfWeek[currentDateIndex];
  }

  getPlantWateringStatus$() {
    return of(false)
  }

  setPlantWateringValue(plant: Plant, wateringStatus: boolean) {
    this.wateringService.updateWateringStatus(
      new Watering(
        this.getCurrentDate(),
        wateringStatus,
        plant.id!
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
