import express from 'express';
import {glob} from 'glob';

const router = express.Router();

router.get('/', async (req, res) => {

    const { query } = req.query;
    console.log('query: ', query);

    if (!query) {
        console.log('no query');
        return res.json({});
    }

    try {
        setTimeout(async () => {
            
            const files = await glob(`node_modules/**/*${query}*`, { nodir: true });
            
            if (files.length === 0) {
                return res.status(404).json({ message: 'No files found' });
            }
            
            res.json({ files });
        }, 5000);

    } catch (error) {
        console.error('Error searching files:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export { router as searchFiles };
