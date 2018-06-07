import { Observable } from 'rxjs';
import { Agendamento } from './../../model/agendamento';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AgendamentosServiceProvider {

  private url = 'http://localhost:8080/api';
  constructor(public http: HttpClient) {
    
  }

  agenda(agendamento: Agendamento) {
    return this.http.post(this.url + '/agendamento/agenda', agendamento)
      .do(() => agendamento.enviado = true)
      .catch((err) => Observable.of(new Error('Falha no agendamento! Tente novamente mais tarde.')));
  }

}
