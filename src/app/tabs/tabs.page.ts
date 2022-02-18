import { ChangeDetectorRef, Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LoginPage } from '../pages/login/login.page';
import { AuthenticationService } from '../services/Authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  user:string ='';
  texto:string='Login';
  ver:boolean=false;
  constructor(
    private aut:AuthenticationService
    ,private cd:ChangeDetectorRef
    ,private modalCtrl:ModalController
    ) {
        this.verificar();
    }
  async verificar(){
    this.ver= await this.aut.isLogin();
    console.log("llll",this.ver);
      if(this.ver){
        this.aut.userDetalle().then(dato=>{
          this.user=dato.email;
          this.texto="Logout("+dato.email+')';
        })
      }
      else
      this.texto='Login';
      this.cd.detectChanges();
  }
  async logout(){
    if(!this.ver){
      const modal = await this.modalCtrl.create({
        component: LoginPage,         
        breakpoints:[0,0.5,0.8],
        initialBreakpoint:1
      })
      await modal.present()
      await modal.onDidDismiss();

      this.aut.userDetalle().then(dato=>{
          this.user=dato.email;
          this.texto="Logout("+dato.email+')';
          this.ver=true;
        })

    }else{
      this.texto='Login';
      let t=await this.aut.isLogin();
      this.aut.logout().then((a)=>{
        this.aut.userDetalle().then((user)=>{
          this.ver=false;
        });
      }).catch(er=>{
          console.log(er)
      });
    }
  }
}
