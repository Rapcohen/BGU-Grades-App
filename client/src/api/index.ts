import GradeFormValues from '../interfaces/GradeFormValues';
import { parseCourseId } from '../components/utils';

export async function getGradesAndDisplay(
    values: GradeFormValues
): Promise<void> {
    const grades = await getGrades(values);
    displayGrades(grades);
}

async function getGrades(values: GradeFormValues): Promise<string> {
    const requestUrl = `/grades/${values.year}/${
        values.semester
    }/${parseCourseId(values.courseId)}`;
    try {
        const response = await fetch(requestUrl);
        // TODO: check what happens if response is not ok
        return await response.text();
    } catch (error) {
        console.error(`Error fetching grades: ${error}`);
        throw error;
    }
}

function displayGrades(grades: string) {
    const blob: Blob = new Blob([grades], { type: 'application/pdf' });
    const url: string = URL.createObjectURL(blob);
    window.open(url, '_blank');
}
