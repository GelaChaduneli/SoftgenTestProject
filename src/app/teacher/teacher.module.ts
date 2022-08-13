import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeacherComponent } from './teacher/teacher.component';
import { TeacherRoutingModule } from './teacher-routing.module';
import { CreateUpdateTeacherComponent } from './create-update-teacher/create-update-teacher.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

//PrimeNG
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
  declarations: [
    TeacherComponent,
    CreateUpdateTeacherComponent,
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    AutoCompleteModule,
    DropdownModule,
    SkeletonModule,
  ]
})
export class TeacherModule { }
