import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from 'src/app/shared/models/cloudbytes/project';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    constructor(private http: HttpClient) { }

    getProjectList() {
        return this.http.get<Project[]>(environment.identityServerUrl + '/Project/GetProject');
    }
    getProjectById(projectId: number) {
        return this.http.get<Project>(environment.identityServerUrl + '/Project/GetProjectById/' + projectId);
    }
    getProjectByTerm(projectTerm: string) {
        return this.http.get<Project>(environment.identityServerUrl + '/Project/GetProjectByTerms/' + projectTerm);
    }
    saveProject(project: Project) {

        return this.http.post<Project>(environment.identityServerUrl + '/Project/AddProject', project);
    }
    updateProject(project: Project) {

        return this.http.put<Project>(environment.identityServerUrl + '/Project/UpdateProject', project);
    }
    deleteProject(projectId: number) {
        return this.http.post<Project>(environment.identityServerUrl + `/Project/DeleteProject/${projectId}` ,null);
    }
}