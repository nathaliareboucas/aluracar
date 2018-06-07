import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Carro } from '../../model/carro';


@Injectable()
export class CarroServiceProvider {

  constructor(public http: HttpClient) {    
  }

  lista() {
    return this.http.get<Carro[]>('http://localhost:8080/api/carro/listaTodos');
  }

}
