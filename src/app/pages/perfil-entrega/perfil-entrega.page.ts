import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-entrega',
  templateUrl: './perfil-entrega.page.html',
  styleUrls: ['./perfil-entrega.page.scss'],
})
export class PerfilEntregaPage implements OnInit {
  slideOpts = {
    initialSlide: 1,
    slidesPerView: 3,
    speed: 400
 
  };


  constructor() { }

  ngOnInit() {
  }

}
