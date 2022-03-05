import { Request, Response } from 'express';
import { getGradesFromBGU } from '../services/grades.service';

function isRequestParamsValid(req: Request): boolean {
    const year = parseInt(req.params.year);
    if (isNaN(year) || year < 2000 || year > new Date().getFullYear()) {
        return false;
    }

    const semesterRegex = /^[1-3]$/;
    if (!req.params.semester.match(semesterRegex)) {
        return false;
    }

    const courseIdRegex = /^[0-9]{3}-[1|2]-[0-9]{4}$/;
    if (!req.params.courseId.match(courseIdRegex)) {
        return false;
    }
    return true;
}

export async function getGradesHandler(req: Request, res: Response) {
    try {
        if (!isRequestParamsValid(req)) {
            return res.status(400).send('Invalid parameters');
        }

        const year: number = parseInt(req.params.year);
        const semester: number = parseInt(req.params.semester);
        const [department, degree, courseNumber]: number[] = req.params.courseId.split('-').map(x => parseInt(x));

        let gradesPdfData: string = await getGradesFromBGU(year, semester, department, degree, courseNumber);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(gradesPdfData);
    } catch (error) {
        res.status(500).send(error.message);
    }
}