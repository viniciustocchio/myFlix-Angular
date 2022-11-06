import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent implements OnInit {

  movies: any[] = [];

  constructor(public fetchApiData: FetchApiDataService) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavoriteMovies();
  }
    
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
    this.movies = resp;
    console.log(this.movies);
    return this.movies;
    });
  }
  
  getFavoriteMovies(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((resp: any) => {
    this.favoriteMovies = resp;
    console.log(this.favoriteMovies);
    return this.favoriteMovies;
    });
  }
  
  isFav(id: string): boolean {
    return this.favoriteMovies.includes(id);
  }
  
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
    data: {
    Name: name,
    Description: description,
    },
    // Assign dialog width
    width: '500px',
    });
  }
  
  openDirectorDialog(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
    data: {
    Name: name,
    Bio: bio,
    Birth: birthday,
    },
    // Assign dialog width
    width: '500px',
    });
  }
  
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
    data: {
    Title: title,
    Description: description,
    },
    // Assign dialog width
    width: '500px',
    });
  }
  
  addToFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
    });
  }
  
  removeFromFavoriteMovies(id: string): void {
    console.log(id);
    this.fetchApiData.removeFavoriteMovie(id).subscribe((result) => {
    console.log(result);
    this.ngOnInit();
    });
  }
}
