import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Game } from '../Interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  
  private dbUrl: string = 'https://videogames-app-mm.herokuapp.com'

  constructor(private http: HttpClient) { }

  getVIdeogames():Observable<Game[]>{
    const url = `${this.dbUrl}/videogames`;
    return this.http.get<Game[]>(url)
  }

  getVIdeogamesByName(termino: string) :Observable<Game[]>{
    const url = `${this.dbUrl}/videogames?name=${termino}`;
    return this.http.get<Game[]>(url)
  }
}
