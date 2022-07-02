import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
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
  showNomi: boolean;
  sub: Subscription;
  constructor() {
    this.nomiSpettacoli = new Array();
  }
  vediSpettacoli() {
    this.showNomi = true;
  }
  nascondi() {
    this.showNomi = false;
  }
  ngOnInit() {
    this.sub = this.spettacoli.subscribe((spettacoli: Array<Spettacolo>) => {
      spettacoli.map((spettacolo: Spettacolo) =>
        this.nomiSpettacoli.push(spettacolo.nomeSpettacolo)
      );
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
