import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styles: [
  ]
})
export class SearchBarComponent implements OnInit {

  @Output() onEnter: EventEmitter<string> = new EventEmitter();
  @Output() onDebounce: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string = '';
  
  debouncer: Subject<string>= new Subject();
  
  termino: string = '';
  
  ngOnInit(): void {
   this.debouncer
   .pipe(debounceTime(300))
   .subscribe(valor => {
    // console.log('debouncer:', valor)
    this.onDebounce.emit(valor)
   })
  }

  buscar(){
    this.onEnter.emit(this.termino)
    
  }

  teclaPresionada(){
    // const valor = event.target.value;
    // console.log(valor);
    // console.log(this.termino)

    this.debouncer.next(this.termino)
  }

}
