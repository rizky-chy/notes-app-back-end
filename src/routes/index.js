import { Router } from 'express';
import notes from '../services/notes/routes/index.js';
// import validateQuery from '../middlewares/validate-query.js';
// import { noteQuerySchema } from '../services/notes/validator/schema.js';
// import { getNotes } from '../services/notes/controller/note-controller.js';

const router = Router();
router.use('/', notes);


export default router;