import {Injectable} from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  DocumentData,
  DocumentReference,
  getFirestore,
  query,
  Query,
  where
} from "@angular/fire/firestore";
import {Watering} from "./watering";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WateringService {

  private firestore = getFirestore();
  private wateringCollection = collection(this.firestore, 'watering',)

  updateWateringStatus(watering: Watering): Promise<DocumentReference> {
    return addDoc(this.wateringCollection, {...watering})
  }

  getWateringOfPlant(plantId: string, date: string): Observable<Watering> {
    const queryFn: Query = query(this.wateringCollection,
      where('plantId', '==', plantId),
      where(`date`, '==', date)
    );

    return collectionData(queryFn, {idField: 'id'})
      .pipe(map((waterings: DocumentData[]) => waterings.map((watering: DocumentData) => watering as Watering)[0]));
  }
}
