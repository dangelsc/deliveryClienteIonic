import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DetalleProductoPageRoutingModule } from './detalle-producto-routing.module';

import { DetalleProductoPage } from './detalle-producto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule,
    DetalleProductoPageRoutingModule
  ],
  declarations: [DetalleProductoPage]
})
export class DetalleProductoPageModule {}
