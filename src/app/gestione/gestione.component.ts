import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Spettacolo } from '../app.component';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.css'],
})
export class GestioneComponent implements OnInit {
  @Input() spettacoli: Observable<Array<Spettacolo>>;
  @Output() spettacoliChange = new EventEmitter();
  nomiSpettacoli: Array<string>;
  constructor() {
    this.nomiSpettacoli = new Array();
  }
  vediSpettacoli() {
    this.spettacoli.subscribe((spettacoli: Array<Spettacolo>) => {
      spettacoli.map((spettacolo: Spettacolo) =>
        this.nomiSpettacoli.push(spettacolo.nomeSpettacolo)
      );
    });
    console.log(this.nomiSpettacoli);
  }
  nascondi() {
    this.nomiSpettacoli = undefined;
  }
  ngOnInit() {}
}
