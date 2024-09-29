import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { ResponseAcceso } from '../Models/ResponseAcceso';
import { Login } from '../Models/Login';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Access/";

  constructor() { }

  /*registrarse(objeto: Usuario): Observable<ResponseAcceso> {
    return this.http.post<ResponseAcceso>(`${this.baseUrl}Acceso/Registrarse`, objeto)
  }*/

  login(objeto: Login): Observable<ResponseAcceso> {
      return this.http.post<ResponseAcceso>(`${this.apiUrl}Login`, objeto)
  }

  validarToken(token: string): Observable<ResponseAcceso> {
      return this.http.get<ResponseAcceso>(`${this.apiUrl}ValidarToken?token=${token}`)
  }
  
}
