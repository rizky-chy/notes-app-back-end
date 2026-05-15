// import notes from '../notes.js';
import NoteRepositories from '../repositories/note-repositories.js';
import response from '../../../utils/response.js';
import AuthorizationError from '../../../exceptions/authentication-error.js';
import { InvariantError, NotFoundError } from '../../../exceptions/index.js';

export const createNote = async (req, res, next) => {
  const { title, tags, body } = req.validated;
  const { id: owner } = req.user;
  const note = await NoteRepositories.createNote({
    title,
    body,
    tags,
    owner
  });

  if (!note) {
    return next(new InvariantError('Catatan gagal ditambahkan'));
  }
  // const id = nanoid(16);
  // const createdAt = new Date().toISOString();
  // const updatedAt = createdAt;

  // const newNote = { title, tags, body, id, createdAt, updatedAt };
  // notes.push(newNote);

  // const isSuccess = notes.filter((note) => note.id === id).length > 0;
  // if (!isSuccess) {
  //   return next(new InvariantError('Catatan gagal ditambahkan'));
  // }

  return response(res, 201, 'Catatan berhasil ditambahkan', { id: note.id });
};

export const getNotes = async (req, res) => {
  const { id: owner } = req.user;
  const notes = await NoteRepositories.getNotes(owner);
  return response(res, 200, 'success', { notes });
  // const { title = '' } = req.query;
  // if (title !== '') {
  //   const note = notes.filter((note) => note.title === title);
  //   return response(res, 200, 'success', { notes: note });
  // }
  // return res.json({
  //   status: 'success',
  //   data: { notes }
  // });
};

export const getNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  try {
    const note = await NoteRepositories.getNoteById(id);

    if (!note) {
      return next(new NotFoundError('Catatan tidak ditemukan'));
    }

    if (note.owner !== owner) {
      return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
    }

    return response(res, 200, 'Catatan sukses ditampilkan', { note });

  } catch (error) {
    return next(error);
  }
};

export const editNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { title, tags, body } = req.validated;

  const note = await NoteRepositories.editNote({
    id,
    title,
    body,
    tags
  });
  if (!note) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }

  return response(res, 200, 'Catatan berhasil diperbarui', { id });
};

export const deleteNoteById = async (req, res, next) => {
  const { id } = req.params;
  const { id: owner } = req.user;

  const isOwner = await NoteRepositories.verifyNoteOwner(id, owner);

  if (!isOwner) {
    return next(new AuthorizationError('Anda tidak berhak mengakses resource ini'));
  }

  try {
    const { id } = req.params;
    const deletedNote = await NoteRepositories.deleteNote(id);

    return response(res, 200, 'Catatan berhasil dihapus', deletedNote);
  } catch (error) {
    return next(new NotFoundError('Catatan tidak ditemukan'));
  }
};