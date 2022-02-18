import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/Authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  public email:String;
  public nombre:String;
  public password:String;
  constructor(
    private aut:AuthenticationService
    ,private alertCtrl:AlertController,
    private control:ModalController
    ) { }

  ngOnInit() {
  }
  registro(){
    this.aut.register(this.email,this.password).then(res=>{
      if(res.user.uid){
        this.aut.nuevo({
          nombre:this.nombre,
          email:this.email,
          uid:res.user.uid,
          password:this.password
        }).then( async res=>{
          const alert = await this.alertCtrl.create({
            cssClass: 'my-custom-class',
            header: 'Registro',
            subHeader: 'Confirmado registro',
            message: 'Ya tiene su cuenta en Delivery',
            buttons: ['OK']
          });
      
          await alert.present();
      
          const { role } = await alert.onDidDismiss();
          this.control.dismiss();
        })
      }
    })
    
  }
}
