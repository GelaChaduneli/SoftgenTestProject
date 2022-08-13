import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Student } from '../student';
import { StudentService } from '../student.service';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {

  createUpdateModalDisplay: boolean = false;
  deleteModalDisplay: boolean = false;

  isUpdateMode: boolean = false;

  students: Student[] = [];

  selectedStudent: Student;


  searchFields: { name: string }[] = [
    { name: 'PN' }, { name: 'FirstName' },
    { name: 'LastName' }, { name: 'BirthDate' }
  ]
  searchField: { name: string } = { name: 'PN' };
  filterValue: Student;


  constructor(private studentService: StudentService) { }

  ngOnInit(): void {
    this.fillStudentsTable();
  }

  fillStudentsTable() {
    this.studentService.getStudents().subscribe({
      next: res => {
        this.students = res;
      }
    });
  }

  trackByStudent(index: number, student: Student): number {
    return student.id;
  }

  filterStudent(event) {
    this.students = this.students.filter(st => st[`${this.searchField.name}`].includes(event.query))
  }

  deleteStudent() {
    this.studentService.deleteStudent(this.selectedStudent.id).subscribe({
      next: res => {
        this.fillStudentsTable();
      },
      complete: () => {
        this.selectedStudent = null
        this.deleteModalDisplay = false
      }
    })
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
    this.deleteModalDisplay = true;
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
