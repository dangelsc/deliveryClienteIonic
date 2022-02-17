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
  login(email,password) {
    console.log(email,password);
    /*return this.afAuth.signInWithEmailAndPassword(email,password)
    .then(() => {
        console.log('Auth Service: loginUser: success');
         this.router.navigate(['']);
    })
    .catch(error => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code)
            return { isValid: false, message: error.message };
        else
            return { isValid: false, message : "Login Error"}
    });*/
    this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }
  logout() {
    this.auth.signOut();
  }
}
