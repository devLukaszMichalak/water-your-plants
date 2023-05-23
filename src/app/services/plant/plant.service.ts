import {Injectable} from '@angular/core';
import {Plant} from "./plant";
import {addDoc, collection, getFirestore} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class PlantService {


  private firestore = getFirestore();
  private plantsCollection = collection(this.firestore, 'plants')

  savePlant(plant: Plant): Promise<void> {
    return addDoc(this.plantsCollection, {...plant})
      .then(() => {
        console.log('Plant added successfully to Firestore!');
      })
      .catch((error) => {
        console.error('Error adding plant to Firestore:', error);
      });

  }
}
