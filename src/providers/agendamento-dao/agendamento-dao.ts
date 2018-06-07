import { Agendamento } from './../../model/agendamento';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AgendamentoDaoProvider {

  constructor(private storage: Storage) {
    
  }

  private geraChave(agendamento: Agendamento) {
    return agendamento.emailCliente + agendamento.data.substr(0, 10);
  }

  salva(agendamento: Agendamento) {
    let chave = this.geraChave(agendamento);
    let promise = this.storage.set(chave, agendamento);

    return Observable.fromPromise(promise);
  }

  ehDuplicado(agendamento: Agendamento) {
    let chave = this.geraChave(agendamento);
    let promise = this.storage.get(chave)
                        .then(dado => dado ? true : false);
    return Observable.fromPromise(promise);
  }

}
