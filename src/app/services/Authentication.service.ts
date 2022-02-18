import { Injectable } from '@angular/core';
import {  Firestore, collection, collectionData,   doc, docData, addDoc, deleteDoc, updateDoc } 
                     from '@angular/fire/firestore';
import { observable, Observable } from 'rxjs';
import { Pedido  as Coleccion } from '../models/Pedido';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
//import { Firestore, FirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private dbpath='Pedido';
  constructor(private auth: AngularFireAuth,
    private afAuth: AngularFireAuth, 
    private router : Router,  
    private afs: AngularFirestore)
  { }
  loginGoogle() {
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  loginEmail(email,password) {
   
    return this.afAuth.signInWithEmailAndPassword(email,password);
  }
  logout()  : Promise<any>
  {
       return new Promise((resolve, reject) =>
       {
          this.afAuth.signOut()
          .then((data : any) => 
          {
             resolve(data);
          })
          .catch((error : any) =>
          {
             reject(error);
          });
      }); 
    
  }
  register(email,pass){
    return this.afAuth.createUserWithEmailAndPassword(email,pass);  
  }
  
  userDetalle(){
    return this.auth.currentUser;
  }
  nuevo(dato){
    return this.afs.collection('Users').doc(dato.id).set(dato);
  }
  async isLogin() : Promise<any>{
    return new Promise((resolve, reject) =>
    {
    console.log("-1");
      this.auth.currentUser.then((s)=>{
        try{
          console.log("--->*",s.email);
          resolve(true);
        }catch(err){
          console.log("No hay usuario");
          resolve(false);
          //return false;
        }
      });
    });    
  }
}
