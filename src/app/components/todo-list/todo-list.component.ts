import {Component, inject, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {Plant} from "../../services/plant/plant";
import {PlantService} from "../../services/plant/plant.service";
import {User} from "@firebase/auth";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent {

  private currentUser: User = inject(AuthService).getCurrentUser();

  plantsToWater$: Observable<Plant[]> = inject(PlantService).getPlantsToWater(this.currentUser.email!, this.getCurrentDay())

  private getCurrentDay() {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDateIndex = new Date().getDay();
    return daysOfWeek[currentDateIndex];
  }
}
