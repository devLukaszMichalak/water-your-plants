import {Component, inject} from '@angular/core';
import {Observable} from "rxjs";
import {Plant} from "../../services/plant/plant";
import {PlantService} from "../../services/plant/plant.service";
import {User} from "@firebase/auth";
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  private currentUser: User = inject(AuthService).getCurrentUser();

  plants$: Observable<Plant[]> = inject(PlantService).getPlants(this.currentUser.email!)
}
