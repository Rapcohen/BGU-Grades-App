import { Request, Response } from 'express';
import { getGradesFromBGU } from '../services/grades.service';

export async function getGradesHandler(req: Request, res: Response) {
    try {
        const year: number = parseInt(req.params.year);
        const semester: number = parseInt(req.params.semester);
        const [department, degree, courseNumber]: number[] = req.params.courseId.split('-').map(x => parseInt(x));

        //TODO: improve validation
        if (!year || !semester || !department || !degree || !courseNumber) {
            return res.status(400).send('Invalid parameters');
        }

        let gradesPdfData: string = await getGradesFromBGU(year, semester, department, degree, courseNumber);
        res.setHeader('Content-Type', 'application/pdf');
        res.send(gradesPdfData);
    } catch (error) {
        res.status(500).send(error.message);
    }
}