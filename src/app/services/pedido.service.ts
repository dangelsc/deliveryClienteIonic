import { Injectable } from '@angular/core';
import {  Firestore, collection, collectionData,   doc, docData, addDoc, deleteDoc, updateDoc } 
                     from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { Pedido  as Coleccion } from '../models/Pedido';
//import { AngularFirestore } from "@angular/fire/firestore";
//import * as firebase from 'firebase';
//import * as firebase from 'firebase';
//import { firestore } from 'firebase';
@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private dbpath='Pedido';
  constructor(private dbb:Firestore)
  { }
  getAll():Observable<Coleccion[]>
  {
    const notesRef = collection(this.dbb, this.dbpath);
    return collectionData(notesRef, { idField: 'id'}) as Observable<Coleccion[]>;
  }
  getItem(id:string):Observable<Coleccion>{

    const ref= doc(this.dbb,`${this.dbpath}/${id}`);
    //this.dbb.app.options.FieldValue.serverTimestamp()
    return docData(ref, { idField: 'id'}) as Observable<Coleccion>;
  }
  add(prod:any)
  {
    console.log("*1");
    const ref = collection(this.dbb, this.dbpath);
    console.log("*2");
    let xx={
      cliente:prod.cliente,
      detalle:prod.detalle,
      fecha:prod.fecha,
      total:prod.total
  };
    
    return addDoc(ref,xx);
  }
  /*edit(id:string,prod:Coleccion){
    const ref = doc(this.dbb,`${this.dbpath}/${id}`);
    return updateDoc(ref,{descripcion:prod.descripcion,
      foto:prod.foto,
      nombre:prod.nombre,
      precio:prod.precio
    });
  }/*
  delete(id:string){
    const ref = doc(this.dbb,`${this.dbpath}/${id}`);
    return delete;
  }*/
  search(query:String){
  /*  if(query==''){
      return this.dbb.collection(this.dbpath);
    }
    let searchTerm=query.toLocaleLowerCase();
    let strlength = searchTerm.length;
    let strFrontCode = searchTerm.slice(0, strlength-1);
    let strEndCode = searchTerm.slice(strlength-1, searchTerm.length);
      
    let endCode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
      // like  'cosa%'
    return this.dbb.collection(this.dbpath,
      ref=>
      //ref.startAt('nombre',query));
      ref.where('nombre','>=',query).where('nombre','<',endCode)
      //startAt(query)
      );*/
  }
}
