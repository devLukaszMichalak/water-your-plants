import { Injectable } from '@angular/core';
import { Plant } from './plant';
import { addDoc, collection, collectionData, deleteDoc, doc, DocumentData, DocumentReference, getFirestore, query, Query, updateDoc, where } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantService {
  
  private firestore = getFirestore();
  private plantsCollection = collection(this.firestore, 'plants');
  
  savePlant(plant: Plant): Promise<DocumentReference> {
    const plantData = (({id, ...rest}) => rest)(plant);
    return addDoc(this.plantsCollection, plantData);
  }
  
  deletePlant(plant: Plant): Promise<void> {
    const plantDocRef = doc(this.plantsCollection, plant.id!);
    return deleteDoc(plantDocRef);
  }
  
  updatePlant(plant: Plant): Promise<void> {
    const {id, ...updatedData} = plant;
    const plantDocRef = doc(this.plantsCollection, id!);
    return updateDoc(plantDocRef, updatedData);
  }
  
  getPlants(owner: string): Observable<Plant[]> {
    const queryFn: Query = query(this.plantsCollection, where('owner', '==', owner));
    
    return collectionData(queryFn, {idField: 'id'})
      .pipe(map((plants: DocumentData[]) => plants.map((plant: DocumentData) => plant as Plant)));
  }
  
  getPlantsToWater(owner: string, day: string): Observable<Plant[]> {
    const queryFn: Query = query(this.plantsCollection,
      where('owner', '==', owner),
      where(`waterOn${day}`, '==', true)
    );
    
    return collectionData(queryFn, {idField: 'id'})
      .pipe(map((plants: DocumentData[]) => plants.map((plant: DocumentData) => plant as Plant)));
  }
}
