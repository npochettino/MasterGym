import { DocumentReference } from '@angular/fire/firestore/interfaces';

export class Cliente{
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  fechaNacimiento: Date;
  imgUrl: string;
  telefono: number;
  documento: string
  ref: DocumentReference;
  visible: boolean;
  /**
   *
   */
  constructor() {

  }
}
