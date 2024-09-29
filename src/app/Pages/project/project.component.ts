import { Component, Input, OnInit, inject } from '@angular/core';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormBuilder,FormGroup,ReactiveFormsModule} from '@angular/forms';
import { ProjectService } from '../../Services/project.service';
import { Router } from '@angular/router';
import { Project } from '../../Models/Project';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatButtonModule,ReactiveFormsModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  @Input('id') id! : number;
  private projectService = inject(ProjectService);
  public formBuild = inject(FormBuilder);

  public formProject:FormGroup = this.formBuild.group({
    id: [0],
    nombre:[''],
    descripcion:[''],
    asignado:['']
  });

  constructor(private router:Router){}

  ngOnInit(): void {
    if(this.id != 0){
      this.projectService.obtener(this.id).subscribe({
        next:(data) =>{
          this.formProject.patchValue({
            name: data.name,
            description:data.description,
            assignedTo:data.assignedTo
          })
        },
        error:(err) =>{
          console.log(err.message)
        }
      })
    }
  }

guardar(){
  const objeto : Project = {
    id : this.id,
    name: this.formProject.value.nombre,
    description: this.formProject.value.descripcion,
    status: 0,
    assignedTo:this.formProject.value.asignado,
  }

  if(this.id == 0){
    this.projectService.crear(objeto).subscribe({
      next:(data) =>{
        if(data){
          this.router.navigate(["/"]);
        }else{
          alert("Error al crear")
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }else{
    this.projectService.editar(objeto).subscribe({
      next:(data) =>{
        if(data){
          this.router.navigate(["/"]);
        }else{
          alert("Error al editar")
        }
      },
      error:(err) =>{
        console.log(err.message)
      }
    })
  }


}

volver(){
  this.router.navigate(["/"]);
}
}
