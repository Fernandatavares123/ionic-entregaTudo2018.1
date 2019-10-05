import { Component, OnInit } from '@angular/core';
import { ListEntregaPage } from '../list-entrega/list-entrega.page';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Entrega } from '../../model/entrega';
import { EntregaService } from 'src/app/service/entrega.service';

@Component({
  selector: 'app-add-entrega',
  templateUrl: './add-entrega.page.html',
  styleUrls: ['./add-entrega.page.scss'],
})
export class AddEntregaPage implements OnInit {
  alertController: any;
  protected entrega: Entrega = new Entrega;
  protected id: string = null;

  constructor(
    protected entregaService: EntregaService,
    protected aletController: AlertController,
    protected router: Router,
    protected activedRoute: ActivatedRoute
  ) { }

  ngOnInit() {this.id = this.activedRoute.snapshot.paramMap.get("id");
  if (this.id) {
    this.entregaService.get(this.id).subscribe(
      res => {
        this.entrega = res
      },
      erro => this.id = null
    )
  }
}

onsubmit(form) {
  if (this.id) {
    this.entregaService.update(this.entrega, this.id).then(
      res => {
        this.presentAlert("Aviso", "Atualizado!");
        form.reset();
        this.entrega = new Entrega;
        this.router.navigate(['/tabs/listEntrega']);
      },
      erro => {
        console.log("Erro: " + erro);
        this.presentAlert("Erro", "Erro ao atualizar!");
      }
    )
  } else {
    this.entregaService.save(this.entrega).then(
      res => {
        this.presentAlert("Aviso", "Cadastrado!");
        form.reset();
        this.entrega = new Entrega;
        this.router.navigate(['/tabs/lisEntrega']);
      },
      erro => {
        console.log("Erro: " + erro);
        this.presentAlert("Erro", "Erro ao cadastrar!");
      }
    )
  }
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

  


