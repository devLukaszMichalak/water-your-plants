import {Injectable} from '@angular/core';
import {Plant} from "./plant";
import {addDoc, collection, getFirestore, onSnapshot, query, where} from "@angular/fire/firestore";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private firestore = getFirestore();
  private plantsCollection = collection(this.firestore, 'plants',)

  savePlant(plant: Plant): Promise<void> {
    return addDoc(this.plantsCollection, {...plant})
      .then(() => {
        console.log('Plant added successfully to Firestore!');
      })
      .catch((error) => {
        console.error('Error adding plant to Firestore:', error);
      });
  }

  loadPlants(owner: string): Observable<Plant[]> {
    return new Observable<Plant[]>((observer) => {
      const unsubscribe = onSnapshot(query(this.plantsCollection, where('owner', '==', owner)), (querySnapshot) => {
        const plants: Plant[] = [];
        querySnapshot.forEach((doc) => {
          plants.push(doc.data() as Plant);
        });
        observer.next(plants);
      }, (error) => {
        console.error('Error loading plants from Firestore:', error);
        observer.next([]); // You can choose to emit an empty array or handle the error differently
      });

      return () => unsubscribe();
    });
  }
}
