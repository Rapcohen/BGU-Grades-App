import { Request, Response } from 'express';
import { getGradesFromBGU } from '../services/grades.service';
import { GradesRequest } from '../services/types';

function isRequestParamsValid(req: Request): boolean {
    const { year, semester, courseId } = req.params;

    const isValidYear = (year) =>
        !isNaN(year) && year >= 2000 && year <= new Date().getFullYear();
    const isValidSemester = (semester) => ['1', '2', '3'].includes(semester);
    const isValidCourseID = (courseId) =>
        courseId.match(/^[0-9]{3}-[1|2]-[0-9]{4}$/);

    return (
        isValidYear(year) &&
        isValidSemester(semester) &&
        isValidCourseID(courseId)
    );
}

export async function getGradesHandler(req: Request, res: Response) {
    try {
        if (!isRequestParamsValid(req)) {
            return res.status(400).send('Invalid parameters');
        }

        const gradesPdfData: string = await getGradesFromBGU(
            getGradesRequestParams(req)
        );

        res.setHeader('Content-Type', 'application/pdf');
        res.send(gradesPdfData);
    } catch (error) {
        res.status(500).send(error.message);
    }
}

function getGradesRequestParams(req: Request): GradesRequest {
    const { year, semester, courseId } = req.params;

    const [department, degree, courseNumber]: string[] = courseId.split('.');

    return {
        year,
        semester,
        department,
        degree,
        courseNumber,
    };
}
