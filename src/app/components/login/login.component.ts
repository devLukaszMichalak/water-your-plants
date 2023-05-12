import {Component, inject, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {getRouterLink, PageRouts} from '../../routing/pages';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private authService = inject(AuthService)
  private router = inject(Router)

  signUpFailed: boolean = false;
  logInFailed: boolean = false;

  firstHeaderText: string = '';
  secondHeaderText: string = '';

  readonly FIRST_HEADER_LINE: string[] = [
    'Remember,',
    'Dear plant lover,',
    'Hello fellow plant enthusiast,',
    'Just a friendly reminder,',
    'Greetings,',
    'To my fellow plant lover,',
    'It\'s plant care time,',
    'Hello there,',
    'For the love of plants,',
    'Hey plant parent,',
    'Dear gardening enthusiast,',
    'Attention plant lover,']
  readonly SECOND_HEADER_LINE: string[] = [
    'watering your plants is important!',
    'water your plants!',
    'don\'t forget to water your plants!',
    'make sure to give your plants a drink!',
    'don\'t forget to water your green friends!',
    'your plants need water to thrive!',
    'watering your plants is key to their survival!',
    'keep your plants hydrated with some H2O!',
    'your plants will thank you for watering them!',
    'give your plants the gift of hydration!',
    'watering your plants is a vital task!',
    'show your plants some love with water!',
    'a little water can go a long way for your plants!'
  ]

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

  ngOnInit(): void {
    this.firstHeaderText = this.getFirstHeaderText();
    this.secondHeaderText = this.getSecondHeaderText();
  }

  logIn(): void {
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

  signUp(): void {
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

  getFirstHeaderText(): string {
    return this.FIRST_HEADER_LINE[Math.floor(Math.random() * this.FIRST_HEADER_LINE.length)]
  }

  getSecondHeaderText(): string {
    return this.SECOND_HEADER_LINE[Math.floor(Math.random() * this.SECOND_HEADER_LINE.length)]
  }
}
