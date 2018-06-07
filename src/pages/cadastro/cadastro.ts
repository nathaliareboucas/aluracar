import { AgendamentoDaoProvider } from './../../providers/agendamento-dao/agendamento-dao';
import { Agendamento } from './../../model/agendamento';
import { HomePage } from './../home/home';
import { AgendamentosServiceProvider } from './../../providers/agendamentos-service/agendamentos-service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert } from 'ionic-angular';
import { Carro } from '../../model/carro';

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {

  public carro: Carro;
  public precoTotal: number;
  private alerta: Alert;
  public nome: string = '';
  public endereco: string =  '';
  public email: string = '';
  public data: string = new Date().toISOString();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private agendamentoService: AgendamentosServiceProvider,
    private alertCtrl: AlertController,    
    private agendamentoDao: AgendamentoDaoProvider) {
      this.carro = this.navParams.get('carroSelecionado');
      this.precoTotal = this.navParams.get('precoTotal');      
  }

  agenda() {
    if(!this.nome || !this.endereco || !this.email) {
      this.alertCtrl.create({
        title: 'Preenchimento obrigatório',
        subTitle: 'Preencha todos os campos!',
        buttons: [
          {text: 'Ok'}
        ]
      }).present();
      return;
    }

    let agendamento: Agendamento = {
      nomeCliente: this.nome,
      enderecoCliente: this.endereco,
      emailCliente: this.email,
      modeloCarro: this.carro.nome,
      precoTotal: this.precoTotal,
      confirmado: false,
      enviado: false,
      data: this.data
    };

    this.alerta = this.alertCtrl.create({
      title: 'Aviso',
      buttons: [{
        text: 'ok',
        handler: () => {
          this.navCtrl.setRoot(HomePage);
        }
      }
      ],      
    });
    
    let mensagem = '';

    this.agendamentoDao.ehDuplicado(agendamento)
      .mergeMap(ehDuplicado => {
        if(ehDuplicado) {
          throw new Error('Agendamento existente');
        }
        return this.agendamentoService.agenda(agendamento)
      })     
      .mergeMap((valor) => {
        let observable = this.agendamentoDao.salva(agendamento);
        if(valor instanceof Error) {
          throw valor;
        }
        return observable;
      })
      .finally(
        () => {
          this.alerta.setSubTitle(mensagem);
          this.alerta.present();
        }
      )    
      .subscribe(
        () => mensagem = 'Agendamento realizado!',
        (err: Error) => mensagem = err.message        
      );
  }  
}
