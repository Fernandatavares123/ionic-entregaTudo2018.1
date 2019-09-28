import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../model/usuario';
import { UsuarioService } from '../../services/usuario.service';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {
  protected usuario: Usuario = new Usuario

  constructor() { }
    protected usuarioService: UsuarioService
  ngOnInit() {
  }

  onsubmit(form) {
    this.usuarioService.save(this.usuario).then(
      res=>{
        console.log("Cadastrado!");
      },
      erro=>{
        console.log("Erro: + erro");
      }
      
    )
   
  }

}