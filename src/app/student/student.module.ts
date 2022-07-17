import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { StudentRoutingModule } from './student-routing.module';
import { CreateUpdateStudentComponent } from './create-update-student/create-update-student.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';


@NgModule({
  declarations: [
    StudentComponent,
    CreateUpdateStudentComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    AutoCompleteModule,
    DropdownModule
  ]
})
export class StudentModule { }
