import { Injectable } from '@angular/core';
import { addDoc, collection, DocumentReference, getFirestore } from "@angular/fire/firestore";
import { Watering } from "./watering";

@Injectable({
  providedIn: 'root'
})
export class WateringService {

  private firestore = getFirestore();
  private wateringCollection = collection(this.firestore, 'watering',)

  updateWateringStatus(watering: Watering): Promise<DocumentReference> {
    return addDoc(this.wateringCollection, {...watering})
  }
}
