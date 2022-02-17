import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } 
                     from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { Producto  as Coleccion, Producto } from '../models/Producto';
//import { AngularFirestore } from "@angular/fire/firestore";
@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private dbpath='Producto';
  constructor(private dbb:Firestore)
  { }
  getAll():Observable<Coleccion[]>
  {
    const notesRef = collection(this.dbb, this.dbpath);
    return collectionData(notesRef, { idField: 'id'}) as Observable<Coleccion[]>;
  }
  getItem(id:string):Observable<Coleccion>{
    const ref= doc(this.dbb,`${this.dbpath}/${id}`);
    return docData(ref, { idField: 'id'}) as Observable<Coleccion>;
  }
  add(prod:Coleccion)
  {
    const ref = collection(this.dbb, this.dbpath);
    return addDoc(ref,prod);
  }
  edit(id:string,prod:Coleccion){
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
