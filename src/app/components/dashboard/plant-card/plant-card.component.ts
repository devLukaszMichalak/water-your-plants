import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-plant-card',
  templateUrl: './plant-card.component.html',
  styleUrls: ['./plant-card.component.scss']
})
export class PlantCardComponent {

  @Input()
  plantImageUrl: string | null = null;

  @Input()
  plantName: string = 'Plant name';
}
