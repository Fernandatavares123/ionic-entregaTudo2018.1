import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, messaging } from 'firebase/app';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { MensagemService } from '../../services/mensagem.service';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform } from '@ionic/angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {



  protected email: string;
  protected senha: string;

  constructor(public afAuth: AngularFireAuth,

    protected router: Router,
    protected msg: MensagemService,
    private googlePlus: GooglePlus,
    private platform: Platform,
    private geolocation: Geolocation
  ) { }

  ngOnInit() {
  }
  onsubmit(form) {
    this.login()
  }
  loginWEB() {
    if (this.platform.is("cordova")) {


      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else {
      this.loginGooglePlus()
    }
  }
  login() {
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha).then(
      res => {
        console.log(res);
        this.router.navigate(["/"])
      },
      error => {
        this.msg.presentAlert("Ops!", "E-mail e/ou senha invalida")
      }

    )
  }
  loginGooglePlus() {
    this.googlePlus.login({})


      .then(res => console.log(res))
      .catch(err => console.error(err));
  }

  logout() {
    this.afAuth.auth.signOut();
    if (!this.platform.is("cordova")){
      this.googlePlus.logout()
    }
  }
    localAtual(){
      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
       }).catch((error) => {
         console.log('Error getting location', error);
       });
       
  }




}