import {Component, inject} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {getRouterLink, PageRouts} from '../../../routing/pages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  logout() {
    this.authService.logOutUser().then(() => this.router.navigate(getRouterLink(PageRouts.LOGIN)))
  }

  toDashboard = () => this.router.navigate(getRouterLink(PageRouts.DASHBOARD)).then()
  toTodolist = () => this.router.navigate(getRouterLink(PageRouts.TODO)).then()
}
