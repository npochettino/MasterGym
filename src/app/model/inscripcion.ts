import { DocumentReference } from '@angular/fire/firestore/interfaces';

export class Inscripcion{
  fecha: Date;
  fechaFinal: Date;
  cliente: DocumentReference;
  precio: DocumentReference;
  subTotal: number;
  impuesto: number;
  total: number

  /**
   *
   */
  constructor() {
    this.fecha = null;
    this.fechaFinal = null;
    this.impuesto = this.impuesto;
    this.cliente = this.cliente;
    this.precio = this.precio;
    this.subTotal = this.subTotal;
    this.total = this.total;

  }


  validar(): any{
    let respuesta = {
      esValido: false,
      mensaje: ''
    }

    if(this.cliente == null || this.cliente == undefined){
      respuesta.esValido = false;
      respuesta.mensaje = "Seleccione un cliente"
      return respuesta
    }

    if(this.precio == null || this.precio == undefined){
      respuesta.esValido = false;
      respuesta.mensaje = "No ha seleccionado un precio"
      return respuesta
    }

    if(this.fecha == null || this.fecha == undefined){
      respuesta.esValido = false;
      respuesta.mensaje = "No tiene Fecha de inicio"
      return respuesta
    }

    if(this.fechaFinal == null || this.fechaFinal == undefined){
      respuesta.esValido = false;
      respuesta.mensaje = "No tiene Fecha Final"
      return respuesta
    }

    if(this.subTotal <= 0 || this.subTotal == undefined){
      respuesta.esValido = false;
      respuesta.mensaje = "No se ha podido calcular el subtotal"
      return respuesta
    }

    if(this.impuesto <= 0 || this.subTotal == undefined){
      respuesta.esValido = false;
      respuesta.mensaje = "No se ha podido calcular el impuesto"
      return respuesta
    }

    if(this.total <= 0 || this.subTotal == undefined){
      respuesta.esValido = false;
      respuesta.mensaje = "No se ha podido calcular el total"
      return respuesta
    }
    respuesta.esValido = true
    return respuesta

  }
}
