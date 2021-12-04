const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const pins = [
  {
    address: "0xffE02Ac5F2fa4944d4ED502625482c6A9e6EA09B",
    ipfsHash: "bafyreiffyqknse4urkfdezcvuri56p4jpjeqv7lwvihxezkveftozgu2ra",
  },
  {
    address: "0xffE02Ac5F2fa4944d4ED502625482c6A9e6EA09B",
    ipfsHash: "bafyreiblzpsbggmkltypf2kuqzqen6g5lmkik77ormc4kyggfryh6yazzq"
  }
];

async function main() {
  await prisma.pin.createMany({
    data: pins,
  });
}


main()
  .catch((e) => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
