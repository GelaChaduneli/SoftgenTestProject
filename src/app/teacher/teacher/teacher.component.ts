import { Component, OnDestroy, OnInit } from '@angular/core';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';
import { Loading } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Unsubscriber } from 'src/app/core/decorators/unsubscriber.decorator';
import { interval, Subscription } from 'rxjs';

@Unsubscriber(true)
@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit, OnDestroy {

  createUpdateModalDisplay: boolean = false;

  isUpdateMode: boolean = false;

  teachers: Teacher[] = [];

  selectedTeacher: Teacher;


  searchFields: { name: string }[] = [
    { name: 'PN' }, { name: 'FirstName' },
    { name: 'LastName' }, { name: 'BirthDate' }
  ]
  searchField: { name: string } = { name: 'PN' };
  filterValue: Teacher;



  get isLoadingForGet(): boolean {
    return Loading.isLoadingForGet
  }



  constructor(private teacherService: TeacherService) { }


  ngOnInit(): void {
    this.intervalFuncSub$();
    this.fillTeachersTable();
  }

  fillTeachersTable() {
    this.teacherService.getTeachers().subscribe({
      next: res => {
        this.teachers = res;
      },
    });
  }

  trackByTeacher(index: number, name: Teacher): number {
    return name.id;
  }

  filterTeacher(event) {
    this.teachers = this.teachers.filter(tch => tch[`${this.searchField.name}`].includes(event.query))
  }

  deleteTeacher() {
    this.teacherService.deleteTeacher(this.selectedTeacher.id).subscribe({
      next: res => {
        this.fillTeachersTable();
      },
      complete: () => {
        this.selectedTeacher = null
      }
    })
  }

  openCreateUpdateTeacherModal(isUpdate: boolean, teacher?: Teacher) {

    if (isUpdate) {

      this.isUpdateMode = true;
      this.selectedTeacher = teacher;
      this.createUpdateModalDisplay = true;

    } else {

      this.isUpdateMode = false;
      this.createUpdateModalDisplay = true;
    }


  }

  resetFilter() {
    this.filterValue = null;
    this.fillTeachersTable();
  }

  openDeleteConfiramtionModal(teacher: Teacher) {
    this.selectedTeacher = teacher;
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
        this.deleteTeacher();
      }
    })
  }

  onCreateUpdateModalClose(message) {
    this.createUpdateModalDisplay = false;
    this.selectedTeacher = null;
    this.fillTeachersTable();

    switch (message) {
      case 'Successfully Updated': console.log('Success--->', message); break;
      case 'Successfully Added': console.log('Success--->', message); break;
      case '': break;
    }
  }

  intervalFuncSub$(): Subscription {
    return interval(1000).subscribe((val) => {
      console.log('interval--->', val)
    })
  }

  ngOnDestroy(): void {

  }
}
