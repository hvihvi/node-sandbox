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


      await prisma.user.create({
        data: {
          name: 'Aliedddeece',
          email: 'bonj@prisma.io',
          posts: {
            create: { title: 'Hello World' },
          },
          profile: {
            create: { bio: 'I like turtles' },
          },
        },
      })
    
      const allUsers = await prisma.user.findMany({
        include: {
          posts: true,
          profile: true,
        },
      })
      console.dir(allUsers, { depth: null })
      console.log("log",allUsers, { depth: null });



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
  console.log(e);
  throw e
})
.finally(async () => {
  await prisma.$disconnect()
});
