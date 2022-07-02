import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Spettacolo, Teatro } from '../app.component';

@Component({
  selector: 'app-gestione',
  templateUrl: './gestione.component.html',
  styleUrls: ['./gestione.component.css'],
})
export class GestioneComponent implements OnInit {
  @Input() spettacoli: Observable<Array<Spettacolo>>;
  @Output() spettacoliChange = new EventEmitter();
  teatro: Teatro;
  nomiSpettacoli: Array<string>;
  nomeSpettacolo: string;
  elemPlatea: Array<number>;
  elemPalco: Array<number>;
  filePlatea: number;
  postiPlatea: number;
  filePalco: number;
  postiPalco: number;
  showNomi: boolean;
  sub: Subscription;
  constructor() {
    this.nomiSpettacoli = new Array();
    this.elemPlatea = new Array(10);
    this.elemPalco;
  }
  seleziona() {
    console.log(typeof this.filePlatea);
    console.log(this.filePlatea);
  }
  inInput($event) {
    console.log($event.target.value);
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
