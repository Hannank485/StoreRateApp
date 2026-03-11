import { PrismaClient, Role } from "../src/generated/prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash("Password@1", 10);

  await prisma.users.upsert({
    where: { email: "admin@test.com" },
    update: {},
    create: {
      name: "Admin User Account One",
      email: "admin@test.com",
      password: hashedPassword,
      address: "123 Admin Street, Mumbai",
      role: Role.ADMIN,
    },
  });

  const owner = await prisma.users.upsert({
    where: { email: "owner@test.com" },
    update: {},
    create: {
      name: "Store Owner Account One",
      email: "owner@test.com",
      password: hashedPassword,
      address: "456 Owner Street, Mumbai",
      role: Role.OWNER,
    },
  });

  await prisma.stores.upsert({
    where: { email: "teststore@test.com" },
    update: {},
    create: {
      name: "Test Store One For Rating",
      email: "teststore@test.com",
      address: "789 Store Street, Mumbai",
      userId: owner.id,
    },
  });

  await prisma.users.upsert({
    where: { email: "user@test.com" },
    update: {},
    create: {
      name: "Normal User Account One",
      email: "user@test.com",
      password: hashedPassword,
      address: "321 User Street, Mumbai",
      role: Role.USER,
    },
  });

  console.log("Seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
