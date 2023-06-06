import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from "../components/dashboard/dashboard.component";
import {LoginComponent} from "../components/login/login.component";
import {PageRouts} from "./pages";
import {authGuard} from "../services/auth/auth-guard";
import {TodoListComponent} from "../components/todo-list/todo-list.component";

const routes: Routes = [
  {path: PageRouts.LOGIN, component: LoginComponent},
  {path: PageRouts.DASHBOARD, component: DashboardComponent, canActivate: [authGuard]},
  {path: PageRouts.TODO, component: TodoListComponent, canActivate: [authGuard]},
  {path: '', redirectTo: PageRouts.LOGIN, pathMatch: 'full'},
  {path: '**', redirectTo: PageRouts.LOGIN, pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
