import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController, ToastController } from '@ionic/angular';
import { Producto } from 'src/app/models/Producto';
import { ProductoService } from 'src/app/services/producto.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { environment } from 'src/environments/environment';
import { Pedido } from 'src/app/models/Pedido';
import { AuthenticationService } from 'src/app/services/Authentication.service';
import { LoginPage } from '../login/login.page';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.page.html',
  styleUrls: ['./detalle-producto.page.scss'],
})
export class DetalleProductoPage implements OnInit {
  @Input() id:string;
  uid:string;
  prod:Producto=new Producto();
  prodForm:FormGroup;
  formatNumber:String=environment.formatNumber;
  constructor(private dbProducto:ProductoService
    ,private modalCtrl:ModalController
    ,private toastCtrl:ToastController
    ,private fg:FormBuilder
    ,private router:Router
    ,private dbPedido:PedidoService
    ,private aut:AuthenticationService
    ) { }

  ngOnInit() {
    this.prodForm= this.fg.group({
      cantidad:['']
    })
    this.dbProducto.getItem(this.id).subscribe(server=>{
      this.prod=server;
    })
    console.log("login = ",this.aut.isLogin());
    //this.aut.userDetalle().subscribe(s=>{
      //console.log('datos de user',s.email);
    //})
    
  }
  async formSub(){
    await this.aut.userDetalle().then(async(s)=>{
      if(s!==null){
      const toast2= await this.toastCtrl.create({
        message:`${s.email}`,
        duration:4000
      });
      await toast2.present();
      }
    })
    
   
    let login=await this.aut.isLogin()
    if(!login){
      const modal = await this.modalCtrl.create({
        component: LoginPage,         
        breakpoints:[0,0.5,0.8],
        initialBreakpoint:1
      })
      await modal.present()
      ///pausa hasta que termina la ventana
      await modal.onDidDismiss();
      //.then(()=>{
        await this.aut.userDetalle().then(s=>{
          this.uid=s.uid;
        })
        this.registraDatos();
        
      //});
    }else{
      await this.aut.userDetalle().then(s=>{
        this.uid=s.uid;
      })
      this.registraDatos();
    }
    
  }
  async registraDatos(){
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
    
    pd.cliente=
      this.uid
    ;
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
