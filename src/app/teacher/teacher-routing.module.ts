import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeacherComponent } from './teacher/teacher.component';

const routes: Routes = [
    {
        path: '',
        component: TeacherComponent,
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ]
})
export class TeacherRoutingModule { }