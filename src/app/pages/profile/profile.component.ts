import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  imagenSubir: File;

  imagenTemp: string = null;

  usuario : Usuario;
  constructor(public usuarioS : UsuarioService) {
    this.usuario = this.usuarioS.usuario;
   }

  ngOnInit() {
  }

  guardar(usuario: Usuario) {
    if ( !this.usuario.google ) {
      this.usuario.email = usuario.email;
    }
    this.usuario.nombre = usuario.nombre;
    this.usuarioS.actualizarUsuario(this.usuario).subscribe();
  }

  seleccionImagen(archivo: File) {
    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    if ( archivo.type.indexOf('image') < 0) {
      swal('Solo imagenes', 'el archivo no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    this.usuarioS.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}
