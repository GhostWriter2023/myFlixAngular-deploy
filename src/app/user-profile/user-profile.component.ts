import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { FetchApiDataService  } from '../fetch-api-data.service'; // Import to bring in the API call created in 6.2

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import to display notifications back to the user

import { DirectorInfoComponent } from '../director-info/director-info.component';
import { MovieSynopsisComponent } from '../movie-synopsis/movie-synopsis.component';
import { GenreInfoComponent } from '../genre-info/genre-info.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{
  @Input() userData = { Username: '', Email: '', Birthday: '', FavoriteMovies: [] };

  user: any = {};
  movies: any[] = [];
  FavoriteMovies : any[] = [];

  constructor( // Constructor for UserProfileComponent
    public fetchApiData: FetchApiDataService, // Service for fetching data from the API
    public snackBar: MatSnackBar, // Service to display notifications
    private router: Router, // Router service for navigation
    public dialog: MatDialog // Service to open dialogs
    ) {}

  ngOnInit(): void {
    this.getProfile();
    this.getFavMovies();
  }

  getProfile(): void { // Function to get user
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.userData.Email = this.user.Email;
    this.userData.Birthday = this.user.Birthday;
    this.fetchApiData.getAllMovies().subscribe((response) => {
      this.FavoriteMovies = response.filter((movie: any) => this.user.FavoriteMovies.includes(movie._id));
    });
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe({ // Function to update user info
      next: (result) => {  
        console.log('User update success');
        localStorage.setItem('user', JSON.stringify(result));
        this.snackBar.open('User update successful', 'OK', {
          duration: 2000
        });
      }, 
      error: (error) => {
        console.log('Error updating user:', error);
        this.snackBar.open('Failed to update user', 'OK', {
          duration: 2000
        });
      }
    });
  }

  deleteUser(): void {
    this.router.navigate(['welcome']).then(() => { // Function to delete user profile
      localStorage.clear();
      this.snackBar.open('User successfully deleted!', 'OK', {
        duration: 2000
      });
    })
    this.fetchApiData.deleteUser().subscribe((result) => {
      console.log(result);
    });
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => { // Function to get all movies
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  openDirectorDialog(name: string, bio: string, birth: string, death: string): void { // Function to open dialog when director button is clicked
    this.dialog.open(DirectorInfoComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birth: birth,
        Death: death
      },
      width: '450px',
    });
  }

  openGenreDialog(name: string, description: string): void { // Function to open dialog when genre button is clicked
    this.dialog.open(GenreInfoComponent, {
      data: {
        Name: name,
        Description: description,
      },
      width: '450px',
    });
  }

  openSynopsisDialog(description: string): void { // Function to open dialog when synopsis button is clicked
    this.dialog.open(MovieSynopsisComponent, {
      data: {
        Description: description,
      },
      width: '450px',
    });
  }

  getFavMovies(): void {  // Function to get favMovie list
    this.user = this.fetchApiData.getUser();
    this.userData.FavoriteMovies = this.user.FavoriteMovies;
    this.FavoriteMovies = this.user.FavoriteMovies;
    console.log('Fav Movies in getFavMovie', this.FavoriteMovies);
  }

  isFav(movie: any): any { // Function to check if a favorite movie
    const MovieID = movie._id;
    if (this.FavoriteMovies.some((movie) => movie === MovieID)) {
      return true;
    } else {
      return false;
    }
  }

  deleteFavMovies(movie: any): void { // Function to delete movie from favMovie list
    this.user = this.fetchApiData.getUser();
    this.userData.Username = this.user.Username;
    this.fetchApiData.deleteFavouriteMovies(movie).subscribe((result) => {
      localStorage.setItem('user', JSON.stringify(result));
      this.getFavMovies();
      this. getProfile();
      this.snackBar.open('Movie has been deleted from your favorites!', 'OK', {
        duration: 3000,
      });
    });
  }
}
