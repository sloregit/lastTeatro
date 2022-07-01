import { Component, VERSION } from '@angular/core';
import { TeatroDBService } from './teatro-db.service';
import { Observable, of, map } from 'rxjs';

export class Spettacolo {
  nomeSpettacolo: string;
  teatro: Teatro; 
}
export class Teatro {
  platea: Array<Array<string>>;
  palco: Array<Array<string>>;
}

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  spettacoliIn$: Observable<Array<Spettacolo>>;
  admin: boolean;
  spettacoloScelto: string;
  nomeUtente: string;
  spettacolo: Observable<Spettacolo>;
  rapido: boolean;
  conferma: string;

  constructor(private TeatroDBService: TeatroDBService) {}

  foo2() {
    this.spettacolo.subscribe((val) => console.log(val));
  }
  //conferma le prenotazioni
  confermaPrenotazioni() {
    this.spettacolo.subscribe((spettacolo) => console.log(spettacolo));
  }

  //prenota al click
  spettacoloChange() {
    //OK
    this.spettacoliIn$.subscribe((spettacoli: Array<Spettacolo>) =>
      this.TeatroDBService.SetPrenotazioni$(
        JSON.stringify(spettacoli)
      ).subscribe(
        (val) => (this.conferma = val + ': ' + this.nomeUtente + ' aggiunto')
      )
    );
  }
  //recupera lo spettacolo dai dati in ingresso e lo trasforma in observable
  getTeatro(rapido: boolean) {
    this.rapido = rapido;
    let spettacoloObs$: Observable<Array<Spettacolo>> = this.spettacoliIn$.pipe(
      map((spettacoli: Array<Spettacolo>) =>
        spettacoli.filter(
          (spettacolo: Spettacolo) =>
            spettacolo.nomeSpettacolo === this.spettacoloScelto
        )
      )
    );
    spettacoloObs$.subscribe({
      next: (spettacolo: Spettacolo[]) =>
        (this.spettacolo = new Observable((subscriber) =>
          subscriber.next(spettacolo[0])
        )),
      error: (e) => console.error('' + JSON.stringify(e)),
    });
  }
  //recupera i dati dal server
  getDati(admin: boolean) {
    this.admin = admin;
    this.TeatroDBService.getPrenotazioni$().subscribe({
      next: (res: string) => {
        this.spettacoliIn$ = of(JSON.parse(res));
      },
      error: (e) =>
        console.error('Observer got an error: ' + JSON.stringify(e)),
    });
  }
  //torna da teatro --> all'inizio
  inizio() {
    this.spettacoliIn$ = undefined;
    this.rapido = undefined;
  }
  //torna da teatro --> a login
  indietro() {
    this.spettacolo = undefined;
    this.rapido = undefined;
    this.nomeUtente = undefined;
    this.conferma = undefined;
  }
}
