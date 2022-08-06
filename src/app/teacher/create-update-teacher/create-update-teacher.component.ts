import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';

@Component({
  selector: 'app-create-update-teacher',
  templateUrl: './create-update-teacher.component.html',
  styleUrls: ['./create-update-teacher.component.scss']
})
export class CreateUpdateTeacherComponent implements OnInit {

  @Input() mode: string;
  @Input() selectedTeacher: Teacher;

  @Output() closeModalEvent = new EventEmitter<string>();

  teacherForm !: FormGroup;
  submitted = false;

  teacher: Teacher;

  constructor(private teacherService: TeacherService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {

  }

  ngOnChanges(): void {
    this.teacherForm = this.formBuilder.group({
      PN: [this.selectedTeacher ? this.selectedTeacher.PN : '', Validators.required],
      FirstName: [this.selectedTeacher ? this.selectedTeacher.FirstName : '', Validators.required],
      LastName: [this.selectedTeacher ? this.selectedTeacher.LastName : '', Validators.required],
      EMail: [this.selectedTeacher ? this.selectedTeacher.EMail : '', [Validators.required, Validators.email]],
      BirthDate: [this.selectedTeacher ? this.selectedTeacher.BirthDate : '', Validators.required]
    })
  }

  get f() { return this.teacherForm.controls }

  closeModal(message: string) {
    this.teacherForm.reset()
    this.submitted = false;
    this.closeModalEvent.emit(message);
  }

  createUpdateTeacher() {

    this.submitted = true;

    if (this.teacherForm.invalid) {
      return;
    }

    this.teacher = this.teacherForm.value


    if (this.mode == 'Update') {
      this.teacher.id = this.selectedTeacher.id

      this.teacherService.putTeacher(this.teacher).subscribe({
        next: res => {
          this.closeModal('Successfully Updated')
        },
        complete: () => this.closeModal('')
      })
    } else {
      this.teacherService.postTeacher(this.teacher).subscribe({
        next: res => {
          this.closeModal('Successfully Added')
        },
        complete: () => this.closeModal('')
      })
    }

  }
}
