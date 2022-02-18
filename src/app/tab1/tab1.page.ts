import { ChangeDetectorRef, Component } from '@angular/core';
import { Producto } from '../models/Producto';
import { ProductoService } from '../services/producto.service';
import { AlertController,ModalController} from '@ionic/angular';
import { DetalleProductoPage } from '../pages/detalle-producto/detalle-producto.page';
import { environment } from 'src/environments/environment';
import { LoginPage } from '../pages/login/login.page';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  formatNumber:String=environment.formatNumber;
  lista:Producto[]=[];
  constructor(private DBProducto:ProductoService
    ,private cd:ChangeDetectorRef
    ,private modalCtrl:ModalController
    ,alertCtrl: AlertController
    ) {
    this.DBProducto.getAll().subscribe(serve=>{
      this.lista=serve;
      this.cd.detectChanges();
    })
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
