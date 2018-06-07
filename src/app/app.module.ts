import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { Observable } from 'rxjs';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HttpClientModule } from '@angular/common/http';
import { CarroServiceProvider } from '../providers/carro-service/carro-service';
import { AgendamentosServiceProvider } from '../providers/agendamentos-service/agendamentos-service';
import { AgendamentoDaoProvider } from '../providers/agendamento-dao/agendamento-dao';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: 'alucarcar',
      storeName: 'agendamentos',
      driverOrder: [
        'indexeddb'
      ]
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarroServiceProvider,
    AgendamentosServiceProvider,
    AgendamentoDaoProvider
  ]
})
export class AppModule {}
