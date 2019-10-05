import { Injectable } from '@angular/core';
import { Entrega } from '../model/entrega';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EntregaService {

  constructor( protected fire: AngularFireDatabase
  ) { }

  save(entrega) {
    return this.fire.list("entrega").push(entrega);
  }

  getAll() {
    return this.fire.list("entrega").snapshotChanges()
      .pipe(
        map(
          dados =>
            dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
        )
      );
  }
  get(id){
    return this.fire.object<Entrega>("entrega/"+ id).valueChanges();
  }
  remover(id){
    return this.fire.object("entrega/"+ id).remove();
  }
  update(entrega, id){
    return this.fire.object("entrega/"+id).update(entrega)
  }
}