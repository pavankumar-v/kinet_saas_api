import prisma from "../src/db";

import '../src/config'

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main();
