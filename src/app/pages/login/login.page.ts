import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth, messaging } from 'firebase/app';
import { Router } from '@angular/router';
import { error } from '@angular/compiler/src/util';
import { MensagemService } from '../../services/mensagem.service';



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
  protected msg: MensagemService
  ) { }

  ngOnInit() {
  }
  onsubmit(form) {
    this.login()
  }
  loginweb() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
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

  logout() {
    this.afAuth.auth.signOut();
  }

}
