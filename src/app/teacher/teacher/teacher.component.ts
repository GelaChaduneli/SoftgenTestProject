import { Component, OnInit } from '@angular/core';
import { Teacher } from '../teacher';
import { TeacherService } from '../teacher.service';
import { MessageService } from 'primeng/api';
import { Loading } from 'src/environments/environment';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  createUpdateModalDisplay: boolean = false;
  deleteModalDisplay: boolean = false;

  isUpdateMode: boolean = false;

  teachers: Teacher[] = [];

  selectedTeacher: Teacher;


  searchFields: { name: string }[] = [
    { name: 'PN' }, { name: 'FirstName' },
    { name: 'LastName' }, { name: 'BirthDate' }
  ]
  searchField: { name: string } = { name: 'PN' };
  filterValue: Teacher;



  public get isLoadingForGet(): boolean {
    return Loading.isLoadingForGet
  }



  constructor(private teacherService: TeacherService, private messageService: MessageService) { }

  ngOnInit(): void {
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
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully deleted!' });
      },
      complete: () => {
        this.selectedTeacher = null
        this.deleteModalDisplay = false
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
    this.deleteModalDisplay = true;
  }

  onCreateUpdateModalClose(message) {
    this.createUpdateModalDisplay = false;
    this.selectedTeacher = null;
    this.fillTeachersTable();

    switch (message) {
      case 'Successfully Updated': this.messageService.add({
        severity: 'success', summary: 'Success', detail: message
      }); break;
      case 'Successfully Added': this.messageService.add({
        severity: 'success', summary: 'Success', detail: message
      }); break;
      case '': break;
    }
  }

}
