import { Application } from 'express';
import { getGradesHandler } from './controllers/grades.controller';

function routes(app: Application) {
    app.get('/grades/:year/:semester/:courseId', getGradesHandler);
}

export default routes;
