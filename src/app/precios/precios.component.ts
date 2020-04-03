import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { MensajesService } from '../services/mensajes.service';
import { Precio } from '../model/precio';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formularioPrecios: FormGroup
  precios: Precio[] = new Array<Precio>()
  esEditar: boolean = false;
  id: string = ""

  constructor(private fb: FormBuilder, private db: AngularFirestore,
    private msj: MensajesService) { }

  ngOnInit() {
    this.formularioPrecios = this.fb.group({
      nombre: ['', Validators.required],
      costo: ['', Validators.required],
      duracion: ['', Validators.required],
      tipoDuracion: ['', Validators.required]
    })

    this.mostrarPrecios()
  }

  mostrarPrecios(){
    this.db.collection<Precio>('precios').get().subscribe((result)=>{
      this.precios.length = 0
      result.docs.forEach((dato)=>{
        let precio = dato.data() as Precio
        precio.id = dato.id
        precio.ref = dato.ref
        this.precios.push(precio)
      })
    })
  }

  agregar(){
    this.db.collection('precios').add(this.formularioPrecios.value).then(()=>{
      this.msj.mensajeSuccess("Agregado", "Se agrego correctamente")
      this.formularioPrecios.reset()
      this.mostrarPrecios()
    }).catch(()=>{
      this.msj.mensajeError("Error", "Ocurrio un error al agregar el precio")
    })
    console.log(this.formularioPrecios.value)
  }

  editarPrecio(precio: Precio){
    this.esEditar = true

    this.formularioPrecios.setValue({
      nombre: precio.nombre,
      costo: precio.costo,
      duracion: precio.duracion,
      tipoDuracion: precio.tipoDuracion
    })
    this.id = precio.id
  }

  editar(){
    this.db.doc('precios/' + this.id).update(this.formularioPrecios.value).then(()=>{
      this.msj.mensajeSuccess('Editado','Se edito correctamente')
      this.formularioPrecios.reset()
      this.esEditar = false
      this.mostrarPrecios()
    }).catch(()=>{
      this.msj.mensajeError("Error", "Ocurrio un error al agregar el precio")
    })
  }
}
