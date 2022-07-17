import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Teacher } from './teacher';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<Teacher[]> {
    return this.http.get<Teacher[]>(`${environment.apiURL}teachers`);
  }


  postTeacher(teacher: Teacher) {
    return this.http.post<Teacher>(`${environment.apiURL}teachers`, teacher).pipe(
      map((res: Teacher) => {
        return res;
      })
    )
  }

  putTeacher(teacher: Teacher) {
    return this.http.put<Teacher>(`${environment.apiURL}teachers/${teacher.id}`, teacher).pipe(
      map((res: Teacher) => {
        return res;
      })
    )
  }

  deleteTeacher(id: number) {
    return this.http.delete<Teacher>(`${environment.apiURL}teachers/${id}`)
  }
}
