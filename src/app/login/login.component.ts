import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formularioLogin: FormGroup
  datosCorrectos:boolean = true;
  mensaje: string = ''
  constructor(private creadorFormulario: FormBuilder, private afAuth: AngularFireAuth, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.formularioLogin = this.creadorFormulario.group({
      email: ['', Validators.compose([
        Validators.required, Validators.email
      ])],
      password: ['', Validators.required]
    })
  }

  login(){
    if(this.formularioLogin.valid)
    {
      this.datosCorrectos = true
      this.spinner.show();
      this.afAuth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password)
      .then((userLogin)=>{
        this.spinner.hide();
      }).catch((ex)=>{
        this.spinner.hide();
        this.datosCorrectos = false
        this.mensaje = ex.message
      })
    }
    else
    {
      this.datosCorrectos = false
      this.mensaje = "A simple warning alert—check it out!"
    }
  }
}
