/* eslint-disable linebreak-style */
const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',

    // Untuk mengaktifkan CORS di seluruh route yang ada pada server 
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  // Menggunakan konfigurasi dari routes.js yang sudah diimpor
  server.route(routes);

  await server.start();
  // eslint-disable-next-line no-console
  console.log(`Server berjalan pada ${server.info.uri}`);
};

// eslint-disable-next-line eol-last
init();