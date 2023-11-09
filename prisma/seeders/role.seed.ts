import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  const prom1 = await prisma.role.upsert({
    where: { name: 'user' },
    create: {
      name: 'user',
    },
    update: {
      name: 'user',
    },
  });
  const prom2 = await prisma.role.upsert({
    where: { name: 'admin' },
    create: {
      name: 'admin',
    },
    update: {
      name: 'admin',
    },
  });
  const prom3 = await prisma.role.upsert({
    where: { name: 'carOwner' },
    create: {
      name: 'carOwner',
    },
    update: {
      name: 'carOwner',
    },
  });
  const prom4 = await prisma.role.upsert({
    where: { name: 'employee' },
    create: {
      name: 'employee',
    },
    update: {
      name: 'employee',
    },
  });

  return Promise.all([prom1, prom2, prom3, prom4]);
}

export default seed();
