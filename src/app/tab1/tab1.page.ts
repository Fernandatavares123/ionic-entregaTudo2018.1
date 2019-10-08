import { Component } from '@angular/core';
import { EntregaService } from '../service/entrega.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  protected usuario: any;
  constructor(
    protected usuarioService: UsuarioService
  ) {
    this.usuario.getAll() .subscribe(
      res=>{
        this.usuario = res
      }
    )
  }

}
