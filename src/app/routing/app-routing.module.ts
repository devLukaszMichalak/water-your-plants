import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {LoginComponent} from "../components/login/login.component";
import {PageRouts} from "./pages";

const routes: Routes = [
  {path: PageRouts.DASHBOARD, component: DashboardComponent},
  {path: PageRouts.LOGIN, component: LoginComponent},
  {path: '', redirectTo: PageRouts.LOGIN, pathMatch: 'full'},
  {path: '**', redirectTo: PageRouts.LOGIN, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
