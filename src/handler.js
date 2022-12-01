const {
  nanoid
} = require('nanoid');

// Mengimpor array notes dari notes.js
const notes = require('./notes');

// Fungsi menambahkan catatan baru
const addNoteHandler = (request, h) => {
  // Mendapatkan body request
  const {
    title,
    tags,
    body
  } = request.payload;

  // Library untuk membuat random id
  const id = nanoid(16);

  /* Karena kasusnya menambahkan catatan baru
   * jadi createdAt dan updatedAt nilainya sama
   */
  const createdAt = new Date().toISOString();

  const updatedAt = createdAt;

  // Memasukkan nilainya ke variable newNote
  const newNote = {
    title,
    tags,
    body,
    id,
    createdAt,
    updatedAt,
  };

  // Memasukkan nilainya kedalam array notes
  notes.push(newNote);

  /* Untuk menentukan apakah newNote sudah masuk kedalam array notes
   * gunakan method filter() berdasarkan id catatan
   */
  const isSuccess = notes.filter((note) => note.id === id).length > 0;

  // Menentukan respon yang diberikan server
  if (isSuccess) {

    // Jika isSuccess bernilai true maka berhasil
    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil ditambahkan',
      data: {
        noteId: id,
      },
    });

    response.code(201);
    return response;
  }

  // Jika isSuccess bernilai false maka gagal
  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal ditambahkan',
  });

  response.code(500);
  return response;
};

/* Fungsi menampilkan semua catatan
 * tidak perlu menuliskan parameter request dan h karena ia tidak digunakan */
const getAllNotesHandler = () => ({
  status: 'success',

  // Mengembalikan data dengan nilai notes
  data: {
    notes,
  },
});

// Fungsi menampilkan data berdasarkan id
const getNoteByIdHandler = (request, h) => {

  // Mendapatkan id dari request.params
  const {
    id
  } = request.params;

  /* Mendapatkan objek note dengan id diatas
   * dari objek array notes 
   * dengan memanfaatkan method array filter() */
  const note = notes.filter((n) => n.id === id)[0];

  /* Pengecekan objek note != undefined
   * jika undefined, mengembalikan respon gagal */
  if (note !== undefined) {
    return {
      status: 'success',
      data: {
        note,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan tidak ditemukan'
  });

  response.code(404);
  return response;
};

// Fungsi edit note berdasarkan id
const editNoteById = (request, h) => {

  // Mendapatkan id dari request.params
  const {
    id
  } = request.params;

  /* Mendapatkan data notes terbaru yang dikirimkan
   * oleh client melalui body request */
  const {
    title,
    tags,
    body
  } = request.payload;

  // Memperbarui nilai pada variable updatedAt
  const updatedAt = new Date().toISOString();

  /* Mendapatkan index array pada objek notes sesuai id
   * menggunakan method array findIndex() */
  const index = notes.findIndex((note) => note.id === id);

  /* Bila note dengan id yang dicari ditemukan, 
   * maka index akan bernilai array index dari objek catatan yang dicari. 
   * Namun bila tidak ditemukan, maka index bernilai -1. 
   * Jadi, kita bisa menentukan gagal atau tidaknya permintaan dari nilai index 
   * menggunakan if else. */
  if (index !== -1) {
    notes[index] = {
      /* (...) / spread operator digunakan untuk mempertahankan nilai notes[index] 
       * yang tidak perlu diubah. */
      ...notes[index],
      title,
      tags,
      body,
      updatedAt,
    };

    const response = h.response({
      status: ' success',
      message: 'Catatan berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui catatan. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

// Fungsi hapus catatan (berdasarkan id)
const deleteNoteByIdHandler = (request, h) => {

  // Mendapatkan id yang dikirim melalui request.params
  const {
    id
  } = request.params;

  // Mendapatkan index dari objek notes sesuai dengan id yang didapat
  const index = notes.findIndex((note) => note.id === id);

  /* Pengecekan nilai index
   * pastikan nilainya tidak -1 bila hendak menghapus catatan. 
   * untuk menghapus data pada array berdasarkan index, gunakan method array splice(). */
  if (index !== -1) {
    notes.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Catatan berhasil dihapus'
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Catatan gagal dihapus. Id tidak ditemukan'
  });

  response.code(404);
  return response;
};

// Mengeksport semua fungsi untuk digunakan di route
module.exports = {
  addNoteHandler,
  getAllNotesHandler,
  getNoteByIdHandler,
  editNoteById,
  deleteNoteByIdHandler
};