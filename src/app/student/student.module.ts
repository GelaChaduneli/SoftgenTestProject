import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { StudentRoutingModule } from './student-routing.module';
import { CreateUpdateStudentComponent } from './create-update-student/create-update-student.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HideAfterDirective } from './student-directives/hide-after.directive';

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { SkeletonModule } from 'primeng/skeleton';


@NgModule({
  declarations: [
    StudentComponent,
    CreateUpdateStudentComponent,
    HideAfterDirective
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
    DropdownModule,
    MessagesModule,
    MessageModule,
    SkeletonModule
  ]
})
export class StudentModule { }
