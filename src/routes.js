// Mengimport semua fungsi yang sudah dibuat di file handler
const {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteById,
  deleteNoteByIdHandler
} = require('./handler');

const routes = [{
    method: 'POST',
    path: '/notes',
    handler: addNoteHandler,
    // Untuk menetapkan CORS pada spesifik route
    // options: {
    //   cors: {
    //     origin: ['*'],
    //   },
    // },
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllNotesHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getNoteByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editNoteById,
  },
  {
    method: 'DELETE',
    path: '/notes/{id}',
    handler: deleteNoteByIdHandler,
  },
];

module.exports = routes;