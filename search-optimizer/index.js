import express from 'express';
import cors from 'cors';
import { searchFiles } from './routes/search.js';

const app = express();
const PORT = 8000;

app.use(cors(
    { origin: '*' }
));
app.use(express.json());

app.use('/search', searchFiles);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
