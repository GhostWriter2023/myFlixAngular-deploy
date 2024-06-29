import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog'; // Used to close the dialog on success
import { FetchApiDataService } from '../fetch-api-data.service'; // Used to bring in the API calls created in 6.2
import { MatSnackBar } from '@angular/material/snack-bar'; // Used to display notifications back to the user

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

constructor(
    public fetchApiData: FetchApiDataService, // The service for fetching API data
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>, // The reference to the dialog
    public snackBar: MatSnackBar) { }  // The service for showing snack bar notifications

ngOnInit(): void {
}

// This is the function responsible for sending the form inputs to the backend
registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((result) => {
  // Logic for a successful user registration goes here! (To be implemented)
     this.dialogRef.close(); // Close the modal on success
     console.log(result);
     this.snackBar.open(result, 'OK', {
        duration: 2000
     });
    }, (result) => {
      console.log(result);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }

  }
