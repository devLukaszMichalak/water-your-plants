import { Injectable } from '@angular/core';
import { Plant } from './plant';
import { addDoc, collection, collectionData, DocumentData, DocumentReference, getFirestore, query, Query, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  private firestore = getFirestore();
  private plantsCollection = collection(this.firestore, 'plants',)

  savePlant(plant: Plant): Promise<DocumentReference> {
    return addDoc(this.plantsCollection, {...plant})
  }

  loadPlants(owner: string): Observable<Plant[]> {
    const queryFn: Query = query(this.plantsCollection, where('owner', '==', owner));
    return collectionData(queryFn, {idField: 'id'})
      .pipe(map((plants: DocumentData[]) => plants.map((task: DocumentData) => task as Plant)));
  }
}
