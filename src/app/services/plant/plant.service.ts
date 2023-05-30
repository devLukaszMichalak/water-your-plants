import { Injectable } from '@angular/core';
import { Plant } from './plant';
import { addDoc, collection, collectionData, DocumentData, getFirestore, query, Query, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

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
    const queryFn: Query = query(this.plantsCollection, where('owner', '==', owner));
    return collectionData(queryFn, {idField: 'id'})
      .pipe(map((plants: DocumentData[]) => plants.map((task: DocumentData) => task as Plant)));
  }
}
