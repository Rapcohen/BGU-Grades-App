import GradeFormValues from '../interfaces/GradeFormValues';

export const years: string[] = Array.from(new Array(10), (_, i) =>
    (new Date().getFullYear() - i).toString()
);

export const semesters = ['1', '2', '3'];

export interface Props {
    onSubmit: (values: GradeFormValues) => Promise<void>;
}

export const parseCourseId = (courseId: string): string =>
    courseId.trim().replace(/\./g, '-');

export const courseIdRegex = /^[0-9]{3}-[1|2]-[0-9]{4}$/;
