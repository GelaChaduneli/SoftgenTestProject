import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Student } from 'src/app/student/student';
import { StudentService } from 'src/app/student/student.service';
import { Teacher } from 'src/app/teacher/teacher';
import { TeacherService } from 'src/app/teacher/teacher.service';
import { Group } from '../group';
import { GroupService } from '../group.service';

@Component({
  selector: 'app-create-update-group',
  templateUrl: './create-update-group.component.html',
  styleUrls: ['./create-update-group.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUpdateGroupComponent implements OnInit {

  @Input() mode: string;
  @Input() selectedGroup: Group;

  @Output() closeModalEvent = new EventEmitter<string>();

  groupForm !: FormGroup;
  submitted = false;

  group: Group;

  students: Student[] = [];

  teachers: Teacher[] = [];

  constructor(private groupService: GroupService, private formBuilder: FormBuilder,
    private studentService: StudentService, private teacherService: TeacherService) { }

  ngOnInit(): void {
    this.getStudents();
    this.getTeachers();
  }

  ngOnChanges(): void {
    this.groupForm = this.formBuilder.group({
      GroupNumber: [this.selectedGroup ? this.selectedGroup.GroupNumber : '', Validators.required],
      GroupName: [this.selectedGroup ? this.selectedGroup.GroupName : '', Validators.required],
      Students: [this.selectedGroup ? this.selectedGroup.Students : []],
      Teachers: [this.selectedGroup ? this.selectedGroup.Teachers : []],
    })
  }

  get f() { return this.groupForm.controls }

  getStudents() {
    this.studentService.getStudents().subscribe({
      next: res => {
        this.students = res;
      }
    })
  }

  getTeachers() {
    this.teacherService.getTeachers().subscribe({
      next: res => {
        this.teachers = res;
      }
    })
  }

  closeModal(message: string) {
    this.groupForm.reset()
    this.submitted = false;
    this.closeModalEvent.emit(message);
  }

  createUpdateGroup() {

    this.submitted = true;

    if (this.groupForm.invalid) {
      return;
    }

    this.group = this.groupForm.value


    if (this.mode == 'Update') {
      this.group.id = this.selectedGroup.id

      this.groupService.putGroup(this.group).subscribe({
        next: res => {
          this.closeModal('Successfully Updated')
        },
        complete: () => this.closeModal('')
      })
    } else {
      this.groupService.postGroup(this.group).subscribe({
        next: res => {
          this.closeModal('Successfully Added')
        },
        complete: () => this.closeModal('')
      })
    }

  }

}
