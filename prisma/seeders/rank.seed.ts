import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
  const prom1 = await prisma.employeeRank.upsert({
    where: { name: 'officer' },
    create: {
      name: 'officer',
    },
    update: {
      name: 'officer',
    },
  });
  const prom2 = await prisma.employeeRank.upsert({
    where: { name: 'sergeant' },
    create: {
      name: 'sergeant',
    },
    update: {
      name: 'sergeant',
    },
  });
  const prom3 = await prisma.employeeRank.upsert({
    where: { name: 'captain' },
    create: {
      name: 'captain',
    },
    update: {
      name: 'captain',
    },
  });

  return Promise.all([prom1, prom2, prom3]);
}

export default seed();
