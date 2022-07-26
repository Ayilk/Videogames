import { Component, OnInit } from '@angular/core';
import { Game } from '../Interfaces/interfaces';
import { CardsService } from '../service/cards.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styles: [],
})
export class CardsComponent implements OnInit{
  videogames: Game[] = [];

  constructor(private cardService: CardsService) {}

  getVideogames() {
    this.cardService.getVIdeogames().subscribe((games) => {
      this.videogames = games;
    });
  }

  ngOnInit(): void {
   
    this.getVideogames()
  }
}
