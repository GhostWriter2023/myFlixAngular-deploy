import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Used to close the dialog on success
import { FetchApiDataService } from '../fetch-api-data.service'; // Used to bring in the API calls created in 6.2
import { MatSnackBar } from '@angular/material/snack-bar'; // Used to display notifications back to the user
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrl: './user-login-form.component.scss'
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
      public fetchApiData: FetchApiDataService, // The service for fetching API data
      public dialogRef: MatDialogRef<UserLoginFormComponent>, // The reference to the dialog
      public snackBar: MatSnackBar, // The service for showing snack bar notifications
      private router: Router // The router service
    ) { }  

  ngOnInit(): void {
  }

  // This is the function responsible for sending the form inputs to the backend
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe({ // debugging to address the deprecation warnings on subscribe, removed  ((result) => {
      next: (result) => {
      // Logic for user to login
        localStorage.setItem('user', JSON.stringify(result.user)); // ('user', result.user.Username)
        localStorage.setItem('token', result.token);
        this.dialogRef.close(); // Close the modal on success
        console.log(result);
        this.snackBar.open('User login successful', 'OK', {
            duration: 2000
        });
        this.router.navigate(['movies']);
      },
      error: (error) => {
        console.log(error);
        this.snackBar.open('User login failed', 'OK', {
          duration: 2000
        });
      }
    });
  }
}



