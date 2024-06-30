import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { UserLoginFormComponent } from '../user-login-form/user-login-form.component';
//import { MovieCardComponent } from '../movie-card/movie-card.component';

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrl: './welcome-page.component.scss'
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }
  ngOnInit(): void {}

openUserRegistrationDialog(): void { // Function to open the dialog when the signup button is clicked
    this.dialog.open(UserRegistrationFormComponent, {
    width: '380px' // Assigning the dialog a width
    });
  }

openUserLoginDialog(): void { // Function to open the dialog when the login button is clicked
    this.dialog.open(UserLoginFormComponent, {
    width: '380px' // Assigning the dialog a width
    });
  }

/*  openMoviesDialog(): void { // Function to open the dialog when the all movies button is clicked
    this.dialog.open(MovieCardComponent, {
      width: '500px'
    });
  } */
}
