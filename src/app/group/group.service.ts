import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Group } from './group';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getGroups(): Observable<Group[]> {
    return this.http.get<Group[]>(`${environment.apiURL}groups`)
  }


  postGroup(group: Group) {
    return this.http.post<Group>(`${environment.apiURL}groups`, group).pipe(
      map((res: Group) => {
        return res;
      })
    )
  }

  putGroup(group: Group) {
    return this.http.put<Group>(`${environment.apiURL}groups/${group.id}`, group).pipe(
      map((res: Group) => {
        return res;
      })
    )
  }

  deleteGroup(id: number) {
    return this.http.delete<Group>(`${environment.apiURL}groups/${id}`)
  }
}
