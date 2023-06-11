import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData, doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  query,
  Query, setDoc,
  where
} from "@angular/fire/firestore";
import {Watering} from "./watering";
import {map, Observable, of, tap} from "rxjs";
import {Plant} from "../plant/plant";

@Injectable({
  providedIn: 'root'
})
export class WateringService {

  private firestore = getFirestore();
  private wateringCollection = collection(this.firestore, 'watering',)

  updateWateringStatus(watering: Watering): Promise<DocumentReference | void> {
    if (!watering.id) {
      const wateringData = (({ id, ...rest }) => rest)(watering);
      return addDoc(this.wateringCollection, {...wateringData})
    } else {
      const wateringData = (({ id, ...rest }) => rest)(watering);
      const wateringDocRef = doc(this.wateringCollection, watering.id);
      return setDoc(wateringDocRef, { ...wateringData }, { merge: true });
    }
  }

  getWateringOfPlant(plant: Plant, date: string): Observable<Watering> {
    const queryFn: Query = query(this.wateringCollection,
      where('plantId', '==', plant.id!),
      where(`date`, '==', date)
    );

    return collectionData(queryFn, {idField: 'id'})
      .pipe(map((waterings: DocumentData[]) => {
        if (waterings.length === 1){
          return waterings.map((watering: DocumentData) => watering as Watering)[0]
        } else {
          return new Watering(null, plant.name, date, false, plant.id!)
        }
      }));
  }
}
