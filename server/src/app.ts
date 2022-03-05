import express, { Application } from 'express';
import path from 'path';
import routes from './routes';

const app: Application = express();

routes(app);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', '..', 'client', 'build')));
    app.get('*', (_req, res) => {
        res.sendFile(path.join(__dirname, '..', '..', 'client', 'build', 'index.html'));
    });
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));