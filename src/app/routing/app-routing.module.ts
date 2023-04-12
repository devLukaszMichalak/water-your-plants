import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {LoginComponent} from "../components/login/login.component";
import {pageRouts} from "./pages";

const routes: Routes = [
  {path: pageRouts.DASHBOARD, component: DashboardComponent},
  {path: pageRouts.LOGIN, component: LoginComponent},
  {path: '', redirectTo: pageRouts.LOGIN, pathMatch: 'full'},
  {path: '**', redirectTo: pageRouts.LOGIN, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
