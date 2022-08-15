import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';
import { Loading } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UnsubscriberClass } from 'src/app/core/global-classes/unsubscriber.directive';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})

export class StudentComponent extends UnsubscriberClass implements OnInit {

  createUpdateModalDisplay: boolean = false;

  isUpdateMode: boolean = false;

  students: Student[] = [];

  selectedStudent: Student;


  searchFields: { name: string }[] = [
    { name: 'PN' }, { name: 'FirstName' },
    { name: 'LastName' }, { name: 'BirthDate' }
  ]
  searchField: { name: string } = { name: 'PN' };
  filterValue: Student;

  get isLoadingForGet(): boolean {
    return Loading.isLoadingForGet
  }


  constructor(private studentService: StudentService) {
    super();
  }


  ngOnInit(): void {
    this.fillStudentsTable();
  }

  fillStudentsTable() {
    const getStudentsSub$ = this.studentService.getStudents().subscribe({
      next: res => {
        this.students = res;
      }
    });
    this.subscription$.add(getStudentsSub$)
  }

  trackByStudent(index: number, student: Student): number {
    return student.id;
  }

  filterStudent(event) {
    this.students = this.students.filter(st => st[`${this.searchField.name}`].includes(event.query))
  }

  deleteStudent() {
    const deleteStudentSubscription$ = this.studentService.deleteStudent(this.selectedStudent.id).subscribe({
      next: res => {
        this.fillStudentsTable();
      },
      complete: () => {
        this.selectedStudent = null
      }
    })
    this.subscription$.add(deleteStudentSubscription$);
  }

  openCreateUpdateStudentModal(isUpdate: boolean, student?: Student) {

    if (isUpdate) {

      this.isUpdateMode = true;
      this.selectedStudent = student;
      this.createUpdateModalDisplay = true;

    } else {

      this.isUpdateMode = false;
      this.createUpdateModalDisplay = true;
    }


  }

  resetFilter() {
    this.filterValue = null;
    this.fillStudentsTable();
  }

  openDeleteConfiramtionModal(student: Student) {
    this.selectedStudent = student;
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteStudent();
      }
    })
  }

  onCreateUpdateModalClose(message) {
    this.createUpdateModalDisplay = false;
    this.selectedStudent = null;
    this.fillStudentsTable();

    switch (message) {
      case 'Successfully Updated': console.log('Success--->', message); break;
      case 'Successfully Added': console.log('Success--->', message); break;
      case '': break;
    }
  }




}
