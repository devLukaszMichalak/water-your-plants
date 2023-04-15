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
    console.log(this.logInForm.value.email!)
    console.log(this.logInForm.value.password!)
    // this.authService.signInUser(this.logInForm.value.email!, this.logInForm.value.password!);
  }

  signUp() {
    console.log(this.signUpForm.value.email!)
    console.log(this.signUpForm.value.password!)
    // this.authService.createUser(this.signUpForm.value.email!, this.signUpForm.value.password!);
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
