"use strict";

const Hapi = require("@hapi/hapi");
const {PrismaClient}=require('@prisma/client');

const prisma = new PrismaClient();


const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "0.0.0.0",
  });

  server.route({
    method: "GET",
    path: "/",
    handler: async (request, h) => {
      const allUsers = await prisma.user.findMany();
      console.log(allUsers);
      return "Hello World!";
    },
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init()
.catch((e) => {
  throw e
})
.finally(async () => {
  await prisma.$disconnect()
});
