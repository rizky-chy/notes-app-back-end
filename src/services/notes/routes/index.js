import express from 'express';
import {
  createNote,
  deleteNoteById,
  editNoteById,
  getNotes,
  getNoteById,
} from '../controller/note-controller.js';
import validate from '../../../middlewares/validate.js';
import validateQuery from '../../../middlewares/validate-query.js';
import { notePayloadSchema, noteQuerySchema } from '../validator/schema.js';

const router = express.Router();

router.post('/notes', validate(notePayloadSchema), createNote);
//router.get('/notes', getNotes);
router.get('/notes/:id', getNoteById);
router.put('/notes/:id', validate(notePayloadSchema), editNoteById);
router.delete('/notes/:id', deleteNoteById);
router.get('/notes', validateQuery(noteQuerySchema), getNotes);

export default router;