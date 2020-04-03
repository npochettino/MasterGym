import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'mastergym';
  cargando: boolean = true;
  usuario: User

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.user.subscribe((usuarioLogin)=>{
      this.cargando = false;
      this.usuario = usuarioLogin
  })

  }

}
