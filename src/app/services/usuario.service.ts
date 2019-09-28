import { Injectable } from '@angular/core';
import { AngularFireDatabaseModule }from '@angular/fire/database'
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    protected fire:AngularFireDatabaseModule
  ) { }
  save(usuario){
    return this.fire.list("usuario").push(usuario);
  }
}
