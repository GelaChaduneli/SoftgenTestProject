import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group/group.component';
import { GroupRoutingModule } from './group-routing.module';
import { CreateUpdateGroupComponent } from './create-update-group/create-update-group.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// PrimeNG
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
  declarations: [
    GroupComponent,
    CreateUpdateGroupComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
    ToastModule,
    AutoCompleteModule,
    DropdownModule,
    MultiSelectModule
  ]
})
export class GroupModule { }
