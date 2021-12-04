'use strict';

const Hapi = require('@hapi/hapi');
const IPFS = require('ipfs-core');
const CID  = require('cids');

const init = async () => {

  const ipfs = await IPFS.create();

  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  });

  server.route({
    method: 'GET',
    path: '/',
    handler: async (request, h) => {
      // const cid = await ipfs.dag.put({ message: 'Hello World!' });
      const cid = new CID('bafyreibe62fzsplsvsvhltnyu6mo4o6u2hfaf5wjb3zjqhkfxga7wbmzca');
      const pin = await ipfs.dag.get(cid, { path: '/message' } );
      // Hello World!
      return pin.value;
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();
