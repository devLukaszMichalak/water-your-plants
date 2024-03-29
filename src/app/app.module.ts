import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {AppRoutingModule} from './routing/app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './components/login/login.component';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {environment} from "../environments/environment";

import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getStorage, provideStorage} from '@angular/fire/storage'
import {ReactiveFormsModule} from '@angular/forms';
import {PlantCardComponent} from './components/dashboard/plant-card/plant-card.component';
import {NewPlantCardComponent} from './components/dashboard/new-plant-card/new-plant-card.component';
import {PlantCreatorModalComponent} from './components/dashboard/new-plant-card/plant-creator-modal/plant-creator-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import {VarDirective} from "./directives/ng-var.directive";
import { PlantEditModalComponent } from './components/dashboard/plant-card/plant-edit-modal/plant-edit-modal.component';
import { PlantDeleteModalComponent } from './components/dashboard/plant-card/plant-edit-modal/plant-delete-modal/plant-delete-modal.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    PlantCardComponent,
    NewPlantCardComponent,
    PlantCreatorModalComponent,
    NavbarComponent,
    TodoListComponent,
    VarDirective,
    PlantDeleteModalComponent,
    PlantEditModalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
