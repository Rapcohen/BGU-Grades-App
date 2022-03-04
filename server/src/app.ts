import express, { Application } from 'express';
import routes from './routes';

const app: Application = express();

routes(app);

// Start the server
const PORT: number = 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));