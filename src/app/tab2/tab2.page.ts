import { Component,ChangeDetectorRef } from '@angular/core';
import { Producto } from '../models/Producto';
import { ProductoService } from '../services/producto.service';
import { AlertController,ModalController} from '@ionic/angular';
import { DetalleProductoPage } from '../pages/detalle-producto/detalle-producto.page';
import { environment } from 'src/environments/environment';
import { PedidoService } from '../services/pedido.service';
import { AuthenticationService } from '../services/Authentication.service';
import { LoginPage } from '../pages/login/login.page';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  formatNumber:String=environment.formatNumber;
  ver:boolean=false;
  //lista:Producto[]=[];
  pedido:[]=[];
  constructor(private DBPedido:PedidoService
    ,private cd:ChangeDetectorRef
    ,private modalCtrl:ModalController
    ,alertCtrl: AlertController,
    private aut:AuthenticationService
    ) {
      
    this.verificarLogin().then(s=>{
      this.DBPedido.getAll().then(serve=>{
        console.log("------>",serve)
        serve.subscribe(
          s=>{
            console.log("------>",s)
            this.pedido=s;
            this.cd.detectChanges();
          }
        )
        
      })
    });
  }
  async verificarLogin(){
    this.ver= await this.aut.isLogin();
      if(!this.ver){
        const modal = await this.modalCtrl.create({
          component: LoginPage,         
          breakpoints:[0,0.5,0.8],
          initialBreakpoint:1
        })
        await modal.present()
        await modal.onDidDismiss();
    }
  }
  async openProducto(prod:Producto){
    console.log(prod);
    const modal = await this.modalCtrl.create({
      component: //LoginPage, 
      DetalleProductoPage,
      componentProps:{id:prod.id},
      breakpoints:[0,0.5,0.8],
      initialBreakpoint:1
    })
    return await modal.present();
  }

}
