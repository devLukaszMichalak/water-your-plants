import {Component, inject} from '@angular/core';
import {AuthService} from "../../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  private router = inject(Router);
  private authService = inject(AuthService);

  logout() {
    this.authService.logOutUser().then(() => this.router.navigate(['login']))
  }
}
