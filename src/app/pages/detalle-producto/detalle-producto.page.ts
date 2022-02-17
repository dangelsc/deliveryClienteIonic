import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { environment } from 'src/environments/environment';
import { Pedido } from 'src/app/models/Pedido';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  @Input() id:string;
  prod:Producto=new Producto();
  prodForm:FormGroup;
  formatNumber:String=environment.formatNumber;
  constructor(private dbProducto:ProductoService
    ,private modalCtrl:ModalController
    ,private toastCtrl:ToastController
    ,private fg:FormBuilder
    ,private router:Router
    ,private dbPedido:PedidoService
    ) { }

  ngOnInit() {
    this.prodForm= this.fg.group({
      cantidad:['']
    })
    this.dbProducto.getItem(this.id).subscribe(server=>{
      this.prod=server;
    })
  }
  async formSub(){
    if(!this.prodForm.valid)
    {
      const toast= await this.toastCtrl.create({
        message:'Existe errores en los campos',
        duration:4000
      });
      await toast.present();
      return;
    }
    let cantidad=this.prodForm.value.cantidad;
    let pd=new Pedido();
    pd.cliente={
      id:'',
      nombre:'',
      apellidos:''
    };
    pd.detalle.push({producto:this.prod
      ,cantidad:cantidad
      ,importe:cantidad*Number(this.prod.precio)});
    pd.fecha=new Date();//'firebase.firestore.FieldValue.serverTimestamp()';
    pd.total=cantidad*Number(this.prod.precio);
    console.log("******",pd);
    this.dbPedido.add(pd);
    
    const toast= await this.toastCtrl.create({
      message:'Datos registrados',
      duration:4000
    });
    await toast.present();

    this.prodForm.reset();
    this.modalCtrl.dismiss();
    this.router.navigate(['/']);
  }

}
