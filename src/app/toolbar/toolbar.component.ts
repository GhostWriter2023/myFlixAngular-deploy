import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})

export class ToolbarComponent implements OnInit {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar
  ) {}
    
  ngOnInit(): void {}
  

  public openMovies(): void { // Function to navigate to movies page
    this.router.navigate(['movies']);
  }

  public openProfile(): void { // Function to navigate to profile page
    this.router.navigate(['profile']);
  }

  public logoutUser(): void { // Function to logout user
    localStorage.setItem('user', '');
    localStorage.setItem('token', '');
    this.router.navigate(['welcome']);
    this.snackBar.open('User logout successful', 'OK', {
      duration: 2000
    })
  } 
}
