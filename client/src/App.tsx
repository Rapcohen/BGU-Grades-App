import React from 'react';
import { GradeForm } from './components/GradeForm';
import { Grid } from '@mui/material';
import './App.css';

interface AppProps {}

const App: React.FC<AppProps> = () => {
    return (
        <Grid className='gridContainer'>
            <Grid item textAlign='center'>
                <h1>BGU Grades</h1>
            </Grid>
            <Grid item>
                <GradeForm />
            </Grid>
        </Grid>
    );
};

export default App;
