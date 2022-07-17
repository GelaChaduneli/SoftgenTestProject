import { Student } from "../student/student";
import { Teacher } from "../teacher/teacher";

export interface Group {
    id: number,
    GroupName: string,
    GroupNumber: string,
    Students?: Student[],
    Teachers?: Teacher[]
}
