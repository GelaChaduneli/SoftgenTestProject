import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Student } from '../student';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-create-update-student',
  templateUrl: './create-update-student.component.html',
  styleUrls: ['./create-update-student.component.scss']
})
export class CreateUpdateStudentComponent implements OnInit {

  @Input() mode: string;
  @Input() selectedStudent: Student;

  @Output() closeModalEvent = new EventEmitter<string>();

  studentForm !: FormGroup;
  submitted = false;

  student: Student;

  constructor(private studentService: StudentService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.studentForm = this.formBuilder.group({
      PN: [this.selectedStudent ? this.selectedStudent.PN : '', Validators.required],
      FirstName: [this.selectedStudent ? this.selectedStudent.FirstName : '', Validators.required],
      LastName: [this.selectedStudent ? this.selectedStudent.LastName : '', Validators.required],
      EMail: [this.selectedStudent ? this.selectedStudent.EMail : '', [Validators.required, Validators.email]],
      BirthDate: [this.selectedStudent ? this.selectedStudent.BirthDate : '', Validators.required]
    })
  }

  get f() { return this.studentForm.controls }

  closeModal(message: string) {
    this.studentForm.reset()
    this.submitted = false;
    this.closeModalEvent.emit(message);
  }

  createUpdateStudent() {

    this.submitted = true;

    if (this.studentForm.invalid) {
      return;
    }

    this.student = this.studentForm.value


    if (this.mode == 'Update') {
      this.student.id = this.selectedStudent.id

      this.studentService.putStudent(this.student).subscribe({
        next: res => {
          this.closeModal('Successfully Updated')
        },
        error: (error: any) => this.closeModal(error),
        complete: () => this.closeModal('')
      })
    } else {
      this.studentService.postStudent(this.student).subscribe({
        next: res => {
          this.closeModal('Successfully Added')
        },
        error: (error: any) => this.closeModal(error),
        complete: () => this.closeModal('')
      })
    }

  }

}
