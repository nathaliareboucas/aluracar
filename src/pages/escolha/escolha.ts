import { CadastroPage } from './../cadastro/cadastro';
import { Acessrio } from './../../model/acessorio';
import { Carro } from './../../model/carro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-escolha',
  templateUrl: 'escolha.html',
})
export class EscolhaPage {

  public carro: Carro;
  public acessorios: Acessrio[];
  private precoTotal: number;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.carro = this.navParams.get('carroSelecionado');
    this.precoTotal = this.carro.preco;
    this.acessorios = [
      {nome: 'Freio ABS', preco: 800},
      {nome: 'Ar-condicionado', preco: 1000},
      {nome: 'MP3', preco: 500}
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EscolhaPage');
  }

  atualizaTotal(ativado: boolean, acessorio: Acessrio) {
    ativado ? this.precoTotal += acessorio.preco : this.precoTotal -= acessorio.preco;
  }

  avancarCadastro() {
    this.navCtrl.push(CadastroPage.name, {
      carroSelecionado: this.carro,
      precoTotal: this.precoTotal
    });
  }

  get precoTotoal() {
    return this.precoTotal;
  }

}
