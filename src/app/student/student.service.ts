import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Student } from './student';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${environment.apiURL}students`)
  }


  postStudent(student: Student) {
    return this.http.post<Student>(`${environment.apiURL}students`, student).pipe(
      map((res: Student) => {
        return res;
      })
    )
  }

  putStudent(student: Student) {
    return this.http.put<Student>(`${environment.apiURL}students/${student.id}`, student).pipe(
      map((res: Student) => {
        return res;
      })
    )
  }

  deleteStudent(id: number) {
    return this.http.delete<Student>(`${environment.apiURL}students/${id}`)
  }


}
