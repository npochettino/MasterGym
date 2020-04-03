import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }

  mensajeError(title: string, text: string){
    Swal.fire({
      title: title,
      text: text,
      icon: 'error'
    })
  }

  mensajeSuccess(title: string, text: string){
    Swal.fire({
      title: title,
      text: text,
      icon: 'success'
    })
  }

  mensajeWarning(title: string, text: string){
    Swal.fire({
      title: title,
      text: text,
      icon: 'warning'
    })
  }
}
