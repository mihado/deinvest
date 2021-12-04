'use strict';

const Hapi = require('@hapi/hapi');
const IPFS = require('ipfs-core');
const CID  = require('cids');

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

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
      const pins = [];
      const cachedPins = await prisma.pin.findMany();

      // console.log(cachedPins);

      for (var cachedPin of cachedPins) {
        let pin = await ipfs.dag.get(new CID(cachedPin.ipfsHash), { path: "/" });
        pins.push(pin);
      }

      // console.log(pins);

      return pins;
    }
  });

  server.route({
    method: 'POST',
    path: '/',
    handler: async (request, h) => {
      // TODO: validate payload;
      // TODO: error handling;
      // TODO: idempotency;
      // TODO: handling proposal changed (versioning);

      // console.log(request.payload);
      const message = request.payload;
      const address = message.address;
      const cid = await ipfs.dag.put(message);

      if (cid) {
        await prisma.pin.create({
          data: {
            address: address,
            ipfsHash: cid.toString()
          }
        })
      }

      return cid.toString();
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
