import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { appsettings } from '../Settings/appsettings';
import { Project } from '../Models/Project';
import { ResponseAPI } from '../Models/ResponseAPI';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private http = inject(HttpClient);
  private apiUrl:string = appsettings.apiUrl + "Projects";

  constructor() { }

  lista(){
    return this.http.get<Project[]>(this.apiUrl);
  }
  obtener(id:number){
    return this.http.get<Project>(`${this.apiUrl}/${id}`);
  }

  crear(objeto:Project){
    return this.http.post<any>(this.apiUrl,objeto);
  }

  editar(objeto:Project){
    return this.http.put<any>(`${this.apiUrl}/${objeto.id}`,objeto);
  }

  eliminar(id:number){
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
