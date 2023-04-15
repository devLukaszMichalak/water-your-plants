import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  private authService = inject(AuthService)

  logInForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    },
    {}
  );

  signUpForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      repeatPassword: new FormControl('', [Validators.required])
    },
    this.sameFieldValues('password', 'repeatPassword')
  );


  logIn() {
    this.authService.logInUser(this.logInForm.value.email!, this.logInForm.value.password!);
  }

  signUp() {
    this.authService.createUser(this.signUpForm.value.email!, this.signUpForm.value.password!);
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
