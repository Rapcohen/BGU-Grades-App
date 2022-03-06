import React from 'react';
import { GradeForm } from './components/GradeForm';
import GradeFormValues from './interfaces/GradeFormValues';
import { Grid } from '@mui/material';
import './App.css';
import { parseCourseId } from './components/utils';

interface AppProps {}

const App: React.FC<AppProps> = () => {
    const handleSubmit = async (values: GradeFormValues) => {
        const grades = await getGrades(values);
        displayGrades(grades);
    };

    return (
        <Grid className='gridContainer'>
            <Grid item textAlign='center'>
                <h1>BGU Grades</h1>
            </Grid>
            <Grid item>
                <GradeForm onSubmit={handleSubmit} />
            </Grid>
        </Grid>
    );
};

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

export default App;
