import { Component, OnInit } from '@angular/core';
import { Inscripcion } from '../model/inscripcion';
import { Cliente } from '../model/cliente';
import { AngularFirestore } from '@angular/fire/firestore';
import { Precio } from '../model/precio';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion()
  clienteSeleccionado: Cliente = new Cliente()
  precioSeleccionado: Precio = new Precio()
  precios: Precio[] = new Array<Precio>()
  idPrecio: string = "null"

  constructor(private db: AngularFirestore, private msj: MensajesService) { }

  ngOnInit() {
    this.db.collection('precios').get().subscribe((result)=>{
      result.docs.forEach((item)=>{
        let precio = item.data() as  Precio
        precio.id = item.id
        precio.ref = item.ref
        this.precios.push(precio)
      })
    })
  }

  asignarCliente(cliente: Cliente){
    this.inscripcion.cliente = cliente.ref
    this.clienteSeleccionado = cliente
  }

  eliminarCliente(){
    this.clienteSeleccionado = new Cliente()
    this.inscripcion.cliente = undefined
  }

  guardar(){
    if(this.inscripcion.validar().esValido)
    {
      let inscripcionAgregar = {
        fecha: this.inscripcion.fecha,
        fechaFinal: this.inscripcion.fechaFinal,
        cliente: this.inscripcion.cliente,
        precio: this.inscripcion.precio,
        subTotal: this.inscripcion.subTotal,
        impuesto: this.inscripcion.impuesto,
        total: this.inscripcion.total
      }

      this.db.collection('inscripciones').add(inscripcionAgregar).then((resutl)=>{
        this.msj.mensajeSuccess("Agregada", "Inscripcion se guardo correctamente")
        this.inscripcion = new Inscripcion()
        this.clienteSeleccionado = new Cliente()
        this.precioSeleccionado = new Precio()
        this.idPrecio = "null"
      }).catch((ex)=>{
        this.msj.mensajeError("Error", "Ocurrio un error inesperado")
      })

    }
    else{
      this.msj.mensajeWarning("Advertencia", this.inscripcion.validar().mensaje)
    }
  }

  seleccionarPrecio(id: string){
    if(id != "null")
    {
      this.precioSeleccionado = this.precios.find(x => x.id == id)
      this.inscripcion.precio = this.precioSeleccionado.ref

      this.inscripcion.subTotal = this.precioSeleccionado.costo
      this.inscripcion.impuesto = this.precioSeleccionado.costo * 0.21
      this.inscripcion.total = this.inscripcion.subTotal + this.inscripcion.impuesto

      this.inscripcion.fecha = new Date()

      if(this.precioSeleccionado.tipoDuracion == 1)
      {
        let dias: number = this.precioSeleccionado.duracion * 1
        this.inscripcion.fechaFinal = new Date()
        this.inscripcion.fechaFinal.setDate(this.inscripcion.fecha.getDate() + dias)
      }
      if(this.precioSeleccionado.tipoDuracion == 2)
      {
        let dias: number = this.precioSeleccionado.duracion * 7
        this.inscripcion.fechaFinal = new Date()
        this.inscripcion.fechaFinal.setDate(this.inscripcion.fecha.getDate() + dias)
      }
      if(this.precioSeleccionado.tipoDuracion == 3)
      {
        let dias: number = this.precioSeleccionado.duracion * 15
        this.inscripcion.fechaFinal = new Date()
        this.inscripcion.fechaFinal.setDate(this.inscripcion.fecha.getDate() + dias)
      }
      if(this.precioSeleccionado.tipoDuracion == 4)
      {
        let dias: number = this.precioSeleccionado.duracion * 30
        this.inscripcion.fechaFinal = new Date()
        this.inscripcion.fechaFinal.setDate(this.inscripcion.fecha.getDate() + dias)
      }
      if(this.precioSeleccionado.tipoDuracion == 5)
      {
        let dias: number = this.precioSeleccionado.duracion * 365
        this.inscripcion.fechaFinal = new Date()
        this.inscripcion.fechaFinal.setDate(this.inscripcion.fecha.getDate() + dias)
      }
    }
    else{
      this.precioSeleccionado = new Precio()
      this.inscripcion.fecha = null
      this.inscripcion.fechaFinal = null
      this.inscripcion.precio = null
      this.inscripcion.subTotal = 0
      this.inscripcion.impuesto = 0
      this.inscripcion.total = 0
    }
  }
}
