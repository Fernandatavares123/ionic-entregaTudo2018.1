import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/model/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.page.html',
  styleUrls: ['./add-usuario.page.scss'],
})
export class AddUsuarioPage implements OnInit {

  usu: {};
  activedRoute: any;
  protected usuario: Usuario = new Usuario;
  protected id: string = null;

  constructor(
    protected usuarioService: UsuarioService,
    protected alertController: AlertController,
    protected router: Router,
    protected ativedRoute: ActivatedRoute


  ) { }


  ngOnInit() {
    this.id = this.activedRoute.snaspshot.paramMap.get("id");
    if (this.id){
      this.usuarioService.get(this.id).subscribe(
        res=>{
          this.usu = res
        },
        erro=> this.id = null
        
      )
    }
  }

  onsubmit(form) {
    
    this.usuarioService.save(this.usuario).then(
      res => {
        this.presentAlert("Aviso", "Cadastrado com sucesso!");
        form.reset();
        this.usuario = new Usuario;
        this.router.navigate(['/tabs/listUsuario'])
      },
      erro => {
        console.log("Erro: " + erro);
        this.presentAlert("Erro", "Erro ao cadastrar!");
      }
    )

  }



  async presentAlert(titulo: string, texto: string) {
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }

}

