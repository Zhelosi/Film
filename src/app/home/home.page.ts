import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../bo/film';
import { Result } from '../bo/result';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
// http
image:string='';
film:string='';
nomFilm:string='';
anneeFilm:string ='';
//https://www.omdbapi.com/?apikey=efdc2275&s=shark&type=movie
//ma clé cd79e324
top10film:Film[] = [];
constructor(private http:HttpClient) {
  let http = 'https://www.omdbapi.com/?apikey=efdc2275&s=shark&type=movie';
  this.http.get<Result>(http).subscribe(

    (result)=> { // JSON
      let r: Result = new Result(result.Response, result.Search, result.totalResults);
      console.log(r.Search);
      for(let i = 0; i < 10 && i < r.Search.length; ++i){
        let element = r.Search[i];      
        console.log(element);
        let film: Film = new Film(element.Title, element.Year, element.imdbID, element.Type, element.Poster);
        this.top10film.push(film);
      }
    }
  );
}
getDetailFilm(imbdID:string, index:number){
  let http = 'https://www.omdbapi.com/?apikey=efdc2275&i='+imbdID;
  this.http.get<Film>(http).subscribe(

    (film)=> { // JSON
      let element = this.top10film[index];
      /*element.Awards = film.Awards;
      element.Country = film.Country;
      element.Director = film.Director;
      element.Genre= film.Genre;
      element.Language = film.Language;
      element.Plot = film.Plot;
      element.Rated = film.Rated;
      element.Ratings = film.Ratings;
      element.Released = film.Released;
      element.Runtime = film.Runtime;
      element.Type = film.Type;
      element.Writer = film.Writer;*/
      element.imdbRating = film.imdbRating;
      console.log(element);
    }
  );
}
getShowFav(){
  for(let i = 0; i < this.top10film.length; ++i){
    let element = this.top10film[i];
    console.log(element.Fav);
    if(!this.top10film[i].Fav){
      this.top10film[i] = null;
    }else{
      this.getDetailFilm(element.imdbID, i);
    }
  }

}
onFav(imbdID:string){
  for(let i = 0; i < this.top10film.length; ++i){
    let element = this.top10film[i];
    if(element.imdbID == imbdID){
      element.Fav = !element.Fav;
      break;
    }
  }
}

onSearch(){
  let value =this.film;
  let http ='http://www.omdbapi.com/?apikey=efdc2275&t='+value;
  this.film='';
}
}