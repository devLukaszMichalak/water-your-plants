import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {getRouterLink, PageRouts} from '../../routing/pages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private authService = inject(AuthService)
  private router = inject(Router)

  signUpFailed: boolean = false;
  logInFailed: boolean = false;

  logInForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    },
    {}
  );
  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      repeatPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
    },
    this.sameFieldValues('password', 'repeatPassword')
  );


  logIn() {
    this.logInFailed = false;
    this.authService.logInUser(this.logInForm.value.email!, this.logInForm.value.password!)
      .then(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(getRouterLink(PageRouts.DASHBOARD)).then()
        } else {
          this.logInFailed = true;
        }
      })
  }

  signUp() {
    this.signUpFailed = false;
    this.authService.createUser(this.signUpForm.value.email!, this.signUpForm.value.password!)
      .then(isAuthenticated => {
        if (isAuthenticated) {
          this.router.navigate(getRouterLink(PageRouts.DASHBOARD)).then()
        } else {
          this.signUpFailed = true;
        }
      })
  }

  private sameFieldValues(firstControlName: string, secondControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const firstControl = formGroup.get(firstControlName);
      const secondControl = formGroup.get(secondControlName);

      if (!firstControl || !secondControl) {
        return null;
      }

      if (firstControl.value !== secondControl.value) {
        return {differentValues: true};
      }

      return null;
    };
  }

}
