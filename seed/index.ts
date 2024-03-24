import prisma from "../src/db";

async function main() {
  const allUsers = await prisma.user.findMany();
  console.log(allUsers);
}

main();
