import { Component, OnInit } from '@angular/core';
import { Game } from '../Interfaces/interfaces';
import { CardsService } from '../service/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: [],
})
export class CardsComponent implements OnInit{

  termino: string = '';
  videogames: Game[] = [];

  constructor(private cardService: CardsService) {}

  getVideogames() {
    this.cardService.getVIdeogames().subscribe((games) => {
      this.videogames = games;
    });
  }
  getVideogamesByName(termino: string){
    this.cardService.getVIdeogamesByName(this.termino).subscribe(game => {
      this.videogames = game
    })
  }


  ngOnInit(): void {
   
    this.getVideogames()
  }
}
