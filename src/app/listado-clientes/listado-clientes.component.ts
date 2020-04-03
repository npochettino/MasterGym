import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss']
})
export class ListadoClientesComponent implements OnInit {
  clients: any[] = new Array<any>();

  constructor(private db: AngularFirestore) { }

  ngOnInit() {

    // this.db.collection('clientes').valueChanges().subscribe((result)=>{
    //   this.clients = result;
    //   console.log(result)
    // })
    this.clients.length = 0;
    this.db.collection('clientes').get().subscribe((result)=>{
      result.docs.forEach((item)=>{
        let cliente = item.data()
        cliente.id = item.id
        cliente.ref = item.ref
        this.clients.push(cliente)
      })
    })
  }

}
