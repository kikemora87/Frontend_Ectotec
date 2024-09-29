export interface ResponseAPI{
    projects: Project[];
}

export interface Project{
    id : number;
    name:string,
    description:string;
    status:number;
    assignedTo:string;
} 