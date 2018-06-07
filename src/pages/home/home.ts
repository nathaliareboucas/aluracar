import { EscolhaPage } from './../escolha/escolha';
import { NavLifecycles } from './../../utils/ionic/nav/nav-lifecyclos';
import { Carro } from './../../model/carro';
import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { HttpErrorResponse } from '@angular/common/http'; 
import { CarroServiceProvider } from '../../providers/carro-service/carro-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements NavLifecycles{

  public carros: Carro[];

  constructor(
    public navCtrl: NavController, 
    private loadCtrl: LoadingController,
    private alertCtrl: AlertController,
    private carroService: CarroServiceProvider) {}

  ionViewDidLoad() {
    let loading = this.loadCtrl.create({
      content: 'Carregando carros...'
    });
    loading.present();

    this.carroService.lista()
      .subscribe(
        (carros) => {
          this.carros = carros;
          loading.dismiss();
        },
        (erro: HttpErrorResponse) => {
          loading.dismiss();
          this.alertCtrl.create({
            title: 'Falha na conexão',
            subTitle: 'Não foi possível carregar a lista de carros. Tente novamente mais tarde.',
            buttons: [
              {text: 'Ok'}
            ]
          }).present();
        });     
  }

  selecionaCarro(carro: Carro) {
    console.log("Carro selecionado", carro);
    this.navCtrl.push(EscolhaPage.name, {
      carroSelecionado: carro
    });
  }
  
}
