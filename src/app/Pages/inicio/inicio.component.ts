import { Component, inject, AfterViewInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ProjectService } from '../../Services/project.service';
import { Project } from '../../Models/Project';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [MatCardModule,MatTableModule,MatIconModule,MatButtonModule, MatPaginator],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent implements AfterViewInit {

  private projectServicio = inject(ProjectService);
  public listaProjects:Project[] = [];
  //dataSource = new MatTableDataSource<Project>(this.listaProjects);
  public displayedColumns : string[] = ['id','name','description','status','assignedTo','accion'];

  //@ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
  }

  obtenerEmpleados(){
    this.projectServicio.lista().subscribe({
      next:(data)=>{
        if(data.length > 0){
          this.listaProjects = data;   
        }
      },
      error:(err)=>{
        console.log(err.message)
      }
    })
  }

  constructor(private router:Router){
    this.obtenerEmpleados();
  }

  nuevo(){
    this.router.navigate(['/project',0]);
  }

  editar(objeto:Project){
    this.router.navigate(['/project',objeto.id]);
  }
  eliminar(objeto:Project){
    if(confirm("Desea eliminar el empleado" + objeto.name)){
      this.projectServicio.eliminar(objeto.id).subscribe({
        next:(data)=>{
          if(data.isSuccess){
            this.obtenerEmpleados();
          }else{
            alert("no se pudo eliminar")
          }
        },
        error:(err)=>{
          console.log(err.message)
        }
      })
    }
  }

}
