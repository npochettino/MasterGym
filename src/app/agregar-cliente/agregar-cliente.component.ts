import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireStorage } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.scss']
})
export class AgregarClienteComponent implements OnInit {

  formularioCliente: FormGroup;
  porcentajeSubida: number = 0;
  urlImagen: string = ''
  esEditable:boolean = false;
  id:string;

  constructor(private fb: FormBuilder, private storage: AngularFireStorage, private db: AngularFirestore,
    private activeRoute: ActivatedRoute, private msj: MensajesService) { }

  ngOnInit() {

    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      documento: [''],
      fechaNacimiento: ['', Validators.required],
      telefono: [''],
      imgUrl: ['', Validators.required]
    })

    this.id = this.activeRoute.snapshot.params.clienteID
    if(this.id != undefined)
    {
      this.esEditable = true
      this.db.doc<any>('clientes/'+ this.id).valueChanges().subscribe((result)=>{

        this.formularioCliente.setValue({
          nombre: result.nombre,
          apellido: result.apellido,
          correo: result.correo,
          telefono: result.telefono,
          fechaNacimiento: new Date(result.fechaNacimiento.seconds * 1000).toISOString().substr(0,10),
          documento: result.documento,
          imgUrl: ''

        })

        this.urlImagen = result.imgUrl
      })
    }


  }

  agregar(){
    this.formularioCliente.value.imgUrl = this.urlImagen
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)

    this.db.collection('clientes').add(this.formularioCliente.value).then((result)=>{
      console.log('Finalizo')
    })

    this.msj.mensajeSuccess("Agregar","Se agrego correctamente")
  }

  editar(){
    this.formularioCliente.value.imgUrl = this.urlImagen
    this.formularioCliente.value.fechaNacimiento = new Date(this.formularioCliente.value.fechaNacimiento)

    this.db.doc('clientes/'+ this.id).update(this.formularioCliente.value).then((result)=>{
      this.msj.mensajeSuccess("Edito","Se edito correctamente")

    }).catch((ex)=>{
      console.log(ex)
      this.msj.mensajeError("Error", "Ocurrio un error")
    })
  }

  subirImagen(evento){
    if(evento.target.files.length > 0)
    {
      let nombre = new Date().getTime().toString()
      let file = evento.target.files[0]

      let extencion = file.name.toString().substring(file.name.toString().lastIndexOf('.')).toLowerCase()

      let ruta = `clientes/${nombre}${extencion}`
      const referencia = this.storage.ref(ruta)
      const tarea = referencia.put(file)
      tarea.then((obj)=>{
        referencia.getDownloadURL().subscribe((result)=>{
          this.urlImagen = result
        })
      })
      tarea.percentageChanges().subscribe((result)=>{
        this.porcentajeSubida = parseInt(result.toString());
      })
    }
  }
}
